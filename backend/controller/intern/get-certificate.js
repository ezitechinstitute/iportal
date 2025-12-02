const { connection } = require("../../config/connection");
// use pureimage for server-side image generation
const PImage = require("pureimage");
const { PassThrough } = require("stream");
const fs = require("fs");
const QrCode = require("qrcode");
const path = require("path");

function CalculateAverage(id, email) {
  return new Promise((resolve, reject) => {
    const sqlProject = `
      SELECT SUM(obt_marks) AS total_obt_marks, SUM(project_marks) AS total_marks
      FROM (SELECT obt_marks, project_marks 
            FROM intern_projects 
            WHERE eti_id = ? AND pstatus = 'Completed' 
            ORDER BY project_id DESC LIMIT 3) AS subquery
    `;

    const sqlAttendance = `
      SELECT SUM(TIMESTAMPDIFF(HOUR, start_shift, end_shift)) AS total_working_hours, 
             COUNT(*) AS total_days
      FROM intern_attendance 
      WHERE email = ?
    `;

    connection.query(sqlProject, [id], (err, projectData) => {
      if (err) return reject("Error querying project data");

      const totalObtMarks = projectData[0].total_obt_marks ?? 0;
      const totalMarks = projectData[0].total_marks ?? 0;

      if (totalMarks === 0)
        return reject(`No valid project data found. ${totalMarks}`);

      const internProjectAverage = (totalObtMarks / totalMarks) * 100;

      connection.query(sqlAttendance, [email], (err, attendanceData) => {
        if (err) return reject("Error querying attendance data");

        const totalWorkingHours = attendanceData[0].total_working_hours ?? 0;
        const totalDays = attendanceData[0].total_days ?? 0;

        const expectedTotalHours = totalDays * 3;
        let attendancePercentage =
          expectedTotalHours > 0
            ? (totalWorkingHours / expectedTotalHours) * 100
            : 0;

        attendancePercentage = Math.min(attendancePercentage, 100);

        let finalAverage =
          internProjectAverage * 0.8 + attendancePercentage * 0.2;

        finalAverage = Math.min(finalAverage, 100);
        finalAverage = parseFloat(finalAverage.toFixed(1));

        resolve(finalAverage);
      });
    });
  });
}

function AssignRewards(avg) {
  if (avg >= 90 && avg <= 100) {
    return "Excelent";
  } else if (avg >= 80 && avg < 90) {
    return "Good";
  } else if (avg >= 70 && avg < 80) {
    return "Average";
  } else {
    return;
  }
}

function CalculateWeeks(month) {
  if (month === 1) {
    return "4 Weeks";
  } else if (month === 2) {
    return "8 Weeks";
  } else if (month === 3) {
    return "12 Weeks";
  } else if (month === 6) {
    return "24 Weeks";
  } else {
    return;
  }
}

const getInternData = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
          a.eti_id AS intern_id,
          a.name AS intern_name,
          a.int_technology,
          a.review,
          t.duration,
          t.cnic,
          p.title,
          last_project.end_date AS last_completed_project_end
      FROM intern_accounts AS a
      LEFT JOIN intern_table AS t 
          ON a.email = t.email
      LEFT JOIN (
          SELECT title, pstatus
          FROM intern_projects
          WHERE email = ? AND pstatus = 'Completed'
          ORDER BY project_id DESC
          LIMIT 3
      ) AS p ON TRUE
      LEFT JOIN (
          SELECT end_date
          FROM intern_projects
          WHERE email = ? AND pstatus = 'Completed'
          ORDER BY end_date DESC
          LIMIT 1
      ) AS last_project ON TRUE
      WHERE a.email = ?;
    `;

    connection.query(sql, [email, email, email], (err, results) => {
      if (err) {
        console.error("Error fetching intern data:", err);
        return reject(err);
      }

      if (!results || results.length === 0) {
        return resolve(null);
      }

      const intern = {
        id: results[0].intern_id?.trim(),
        cnic: results[0].cnic,
        name: results[0].intern_name,
        tech: results[0].int_technology,
        duration: results[0].duration,
        start_date: results[0].start_date,
        review: results[0].review,
        last_project_end_date: results[0].last_completed_project_end,
        projects: results
          .filter((r) => r.title)
          .map((r) => ({ title: r.title })),
      };

      resolve(intern);
    });
  });
};

const GetCertificate = async (req, res) => {
  const { email } = req.params;

  const template = path.join(
    __dirname,
    "../../certificate/certificate_template.png"
  );

  try {
    const data = await getInternData(email);

    const avg = await CalculateAverage(data.id, data.email);
    console.log(avg);

    if (avg < 70) {
      return res.json({
        success: false,
        message: "You are not eligible to download certificate!!!",
        average: avg,
      });
    }

    const reward = AssignRewards(avg);
    const weeks = CalculateWeeks(parseInt(data.duration));

    // Certificate (pureimage)
    const verificationUrl = `https://interns.ezitech.org/public-profile/${encodeURIComponent(
      data.id
    )}`;
    const qrBuffer = await QrCode.toBuffer(verificationUrl);

    if (!fs.existsSync(template)) {
      throw new Error(`Certificate template not found: ${template}`);
    }

    const bgStream = fs.createReadStream(template);
    const background = await PImage.decodePNGFromStream(bgStream);
    const canvas = PImage.make(background.width, background.height);
    const ctx = canvas.getContext("2d");

    // Assuming fonts are in backend/fonts/Open_Sans/static/
    const regularFontPath = path.join(
      __dirname,
      "../../fonts/Open_Sans/static/OpenSans-Regular.ttf"
    );
    const boldFontPath = path.join(
      __dirname,
      "../../fonts/Open_Sans/static/OpenSans-Bold.ttf"
    );

    if (!fs.existsSync(regularFontPath) || !fs.existsSync(boldFontPath)) {
      console.warn(
        "Font files missing. Make sure TTF exists in backend/fonts/"
      );
    }

    const regularFont = PImage.registerFont(regularFontPath, "OpenSansRegular");
    const boldFont = PImage.registerFont(boldFontPath, "OpenSansBold");
    regularFont.loadSync();
    boldFont.loadSync();

    // Draw background
    ctx.drawImage(background, 0, 0);

    // ------------------------------
    // Draw intern info
    // ------------------------------
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // Name
    ctx.font = "50pt 'OpenSansBold'";
    ctx.fillText(data.name || "", canvas.width / 2, 600);

    // Tech
    ctx.font = "40pt 'OpenSansRegular'";
    ctx.fillText(`Internship in ${data.tech || ""}`, canvas.width / 2, 670);

    // Issued Date
    ctx.font = "30pt 'OpenSansRegular'";
    ctx.textAlign = "left";
    ctx.fillText(`Issued Date: ${new Date().toLocaleDateString()}`, 275, 590);

    // ID & CNIC
    ctx.textAlign = "end";
    ctx.fillText(`ID: ${data.id}`, 2060, 550);
    ctx.fillText(`CNIC: ${data.cnic}`, 2100, 590);

    // Paragraph
    const paraGraph = `He/She worked with us for an overall period of (${new Date(
      data.start_date
    )
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-")} To ${new Date(data.last_project_end_date)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(
        / /g,
        "-"
      )} ). During his/her period of internship, he/she was found attentive, punctual, and hard-working. Punctuality was one of his/her strengths, as he/she consistently arrived on time and met deadlines effectively. Additionally, his/her work ethic was strong, and he/she consistently delivered high-quality work.`;

    ctx.font = "35pt 'OpenSansRegular'";
    ctx.textAlign = "center";

    const words = paraGraph.split(" ");
    let line = "";
    let y = 750;
    const lineHeight = 50;
    const maxWidth = 1800;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      if (ctx.measureText(testLine).width > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Duration, Projects, Rewards
    ctx.font = "30pt 'OpenSansRegular'";
    ctx.textAlign = "left";
    ctx.fillText(weeks, 425, 1012);

    const projectTitles = data.projects.map((p) => p.title).join(", ");
    ctx.fillText(projectTitles, 425, 1055);
    ctx.fillText(`Certificate of ${reward} in Internship`, 425, 1098);

    // CEO Name + Designation
    const ceoName = "Ibrahim Shah";
    const ceoDesignation = "Chief Executive Ezitech Institute";
    const x = 600,
      z = 1300;

    ctx.font = "30pt 'OpenSansBold'";
    ctx.textAlign = "center";
    ctx.fillText(ceoName, x, z);

    const nameWidth = ctx.measureText(ceoName).width;
    const underlineY = z + 20;
    ctx.beginPath();
    ctx.moveTo(x - nameWidth / 2, underlineY);
    ctx.lineTo(x + nameWidth / 2, underlineY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.font = "25pt 'OpenSansRegular'";
    ctx.textBaseline = "top";
    ctx.fillText(ceoDesignation, x, underlineY + 35);

    // QR Code
    const qrStream = new PassThrough();
    qrStream.end(qrBuffer);
    const qrImage = await PImage.decodePNGFromStream(qrStream);
    const qrSize = 180;
    ctx.drawImage(qrImage, 1800, 1225, qrSize, qrSize);

    // Verifier text
    ctx.font = "20pt 'OpenSansRegular'";
    ctx.fillText("Scan to Verify", 1800 + qrSize / 2, 1225 + qrSize + 5);

    // Send response
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${data.name}_certificate.png`
    );
    await PImage.encodePNGToStream(canvas, res);
  } catch (err) {
    console.error("Error in GetCertificate:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = GetCertificate;
