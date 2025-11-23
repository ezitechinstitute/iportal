const { connection } = require("../../config/connection");
const { createCanvas, loadImage } = require("@napi-rs/canvas");
const QrCode = require("qrcode");
const path = require("path");

function ClaculateAverage(email) {
  return new Promise((resolve, reject) => {
    const sqlProject = `
      SELECT SUM(obt_marks) AS total_obt_marks, SUM(project_marks) AS total_marks
      FROM (SELECT obt_marks, project_marks FROM intern_projects WHERE email = ? ORDER BY project_id DESC LIMIT 3) AS subquery
    `;

    const sqlAttendance = `
      SELECT SUM(TIMESTAMPDIFF(HOUR, start_shift, end_shift)) AS total_working_hours, 
             COUNT(*) AS total_days
      FROM intern_attendance 
      WHERE email = ?
    `;

    connection.query(sqlProject, [email], (err, projectData) => {
      if (err) return reject("Error querying project data");

      if (
        !projectData ||
        projectData.length === 0 ||
        projectData[0].total_marks === 0
      )
        return reject("No valid project data found for the given intern.");

      const totalObtMarks = projectData[0].total_obt_marks || 0;
      const totalMarks = projectData[0].total_marks || 1;
      const internProjectAverage = (totalObtMarks / totalMarks) * 100;

      connection.query(sqlAttendance, [email], (err, attendanceData) => {
        if (err) return reject("Error querying attendance data");

        const totalWorkingHours = attendanceData[0].total_working_hours || 0;
        const totalDays = attendanceData[0].total_days || 1;
        const expectedTotalHours = totalDays * 3;
        let attendancePercentage =
          (totalWorkingHours / expectedTotalHours) * 100;

        attendancePercentage = Math.min(attendancePercentage, 100);

        let finalAverage =
          internProjectAverage * 0.8 + attendancePercentage * 0.15;

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
          a.start_date,
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
    const avg = await ClaculateAverage(email);

    if (avg < 70) {
      return res.json({
        success: false,
        message: "You are not eligible to download certificate!!!",
        average: avg,
      });
    }

    const data = await getInternData(email);

    if (
      data.review === null ||
      data.review === "Pending" ||
      data.review === "Rejected"
    ) {
      return res.json({
        success: false,
        message: "You are not eligible to download certificate!!!",
        review: data.review,
      });
    }

    const reward = AssignRewards(avg);
    const weeks = CalculateWeeks(parseInt(data.duration));

    // Certificate

    const verificationUrl = `https://ezitech.org/internship/verification/${data.id}`;
    const qrCodeData = await QrCode.toDataURL(verificationUrl);
    // Load certificate background
    const background = await loadImage(template);
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext("2d");

    // Draw background (default content already printed)
    ctx.drawImage(background, 0, 0);

    // Add dynamic intern data
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "bold 50px Arial";

    // Name
    ctx.fillText(data.name, 1190, 600);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "bold 40px Arial";

    // Tech
    ctx.fillText(`Internship in ${data.tech}`, 1190, 670);

    //   Issed Date
    ctx.font = "30px Arial";
    ctx.textAlign = "left";
    //   ctx.textDecoration = "underline";
    ctx.fillText(`Issued Date: ${new Date().toLocaleDateString()}`, 275, 590);

    ctx.font = "30px Arial";
    ctx.textAlign = "end";
    ctx.fillStyle = "black";
    //   ctx.textDecoration = "underline";
    ctx.fillText(`ID: ${data.id}`, 2060, 550);

    //   cnic
    ctx.font = "30px Arial";
    ctx.textAlign = "end";
    ctx.fillStyle = "black";
    ctx.fillText(`CNIC: ${data.cnic}`, 2100, 590);

    let paraGraph = `He/She worked with us for an overall period of (${new Date(
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
      )}). During his/her period of internship, he/she was found attentive, punctual, and hard-working. Punctuality was one of his/her strengths, as he/she consistently arrived on time and met deadlines effectively. Additionally, his/her work ethic was strong, and he/she consistently delivered high-quality work.`;
    ctx.font = "35px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";

    const words = paraGraph.split(" ");
    let line = "";
    let y = 750;
    const lineHeight = 50;
    const maxWidth = 1800; // Maximum width for the text

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Duration
    ctx.font = "30px Arial";
    ctx.textAlign = "left"; // 👈 important: text will always start from x
    ctx.fillStyle = "black";
    ctx.fillText(weeks, 425, 1012);

    //   Projects
    ctx.font = "30px Arial";
    ctx.textAlign = "left"; // 👈 important: text will always start from x
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    const projectTitles = data.projects.map((p) => p.title).join(", ");
    ctx.fillText(projectTitles, 425, 1043);

    // Rewards
    ctx.font = "30px Arial";
    ctx.textAlign = "left"; // 👈 important: text will always start from x
    ctx.fillStyle = "black";
    ctx.fillText(`Certificate of ${reward} in Internship`, 425, 1085);

    // CEO name and designation
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const name = "Ibrahim Shah";
    const designation = "Chief Executive Ezitech Institute";
    const x = 600;
    const z = 1300;

    // Draw name
    ctx.fillText(name, x, z);

    // Measure name width for underline
    const nameWidth = ctx.measureText(name).width;

    // Draw underline (a little below the name)
    const underlineY = z + 15; // adjust spacing below the name
    ctx.beginPath();
    ctx.moveTo(x - nameWidth / 2, underlineY);
    ctx.lineTo(x + nameWidth / 2, underlineY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw designation below the underline
    ctx.font = "bold 25px Arial";

    ctx.fillText(designation, x, underlineY + 25); // adjust 25 for spacing

    // Load and draw QR code
    const qrImage = await loadImage(qrCodeData);

    const qrSize = 180;

    ctx.drawImage(qrImage, 1800, 1225, qrSize, qrSize);

    // Verifier text
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(
      "Scan to Verify",
      1800 + qrSize / 2,
      1225 + qrSize + 5 // Position below the QR code
    );

    // Send response
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${data.name}_certificate.png`
    );
    canvas.pngStream().pipe(res);

    // res.json({
    //   success: true,
    //   message: "You are eligible to download certificate!!!",
    //   average: avg,
    //   reward,
    //   internData: data,
    // });
  } catch (err) {
    console.error("Error in GetCertificate:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = GetCertificate;
