const { connection } = require("../../config/connection");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { DateTime } = require("luxon"); // Install luxon for better date handling

const GetInternProjects = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT * FROM `intern_projects` WHERE `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetProjectDetail = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT title, description FROM `intern_projects` WHERE `project_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const CreateTask = (req, res) => {
  const { projectId, id, taskTitle, startDate, endDate, durationDays, points } =
    req.body.task;

  const values = [projectId, id, taskTitle, startDate, endDate, durationDays];

  const sql =
    "INSERT INTO `intern_tasks`(`project_id`, `eti_id`, `task_title`, `t_start_date`, `t_end_date`, `task_duration`) VALUES (?)";
  connection.query(sql, [values], (err, data) => {
    if (err) throw err;
    let lastId = data.insertId;

    const sql =
      "SELECT COUNT(*) as tasksCount FROM `intern_tasks` WHERE `project_id` = ?";
    connection.query(sql, [projectId], (reject, resolve) => {
      if (err) throw err;
      if (resolve[0].tasksCount <= points) {
        let taskPoint = points / resolve[0].tasksCount;

        console.log(taskPoint);

        const sql =
          "UPDATE `intern_tasks` SET `task_mark` = ? WHERE `project_id` = ?";
        connection.query(sql, [taskPoint, projectId], (err, result) => {
          if (err) throw err;
          return res.json({ msg: "Task created successfully" });
        });
      } else {
        DeleteExtraTask(lastId);
        return res.json({ msg: "Task limit exceeds project points!!!" });
      }
    });
  });
};

const GetInternTasks = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT * FROM intern_tasks JOIN intern_projects ON intern_tasks.project_id = intern_projects.project_id WHERE intern_tasks.eti_id = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const TaskDayIncrement = (req, res) => {
  const sql1 =
    "SELECT task_days, task_duration FROM intern_tasks WHERE task_status = 'Ongoing'";
  connection.query(sql1, (err, data1) => {
    if (err) {
      return res.json(err);
    } else {
      for (let i = 0; i < data1.length; i++) {
        if (data1[i].task_days < data1[i].task_duration) {
          const day = data1[i].task_days + 1;

          const sql2 = `UPDATE intern_tasks SET task_days= ? WHERE task_status = 'Ongoing' AND t_end_date < CURRENT_DATE`;
          connection.query(sql2, [day], (err, data2) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data2);
            }
          });
        } else {
          const sql2 =
            `UPDATE intern_tasks SET task_status = 'Expired' WHERE task_status = 'Ongoing' AND t_end_date > CURRENT_DATE`;
          connection.query(sql2, (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data3);
            }
          });
        }
      }
    }
  });
};

// cron.schedule("0 * * * * *", () => {
//   console.log("running the project schedule");
//   // ProjectDayIncrement();
//   TaskDayIncrement();
// });

const isMidnightInPakistan = () => {
  const nowInPakistan = DateTime.now().setZone("Asia/Karachi");
  const hour = nowInPakistan.hour;
  const minute = nowInPakistan.minute;

  return hour === 0 && minute === 0; // Midnight check
};

cron.schedule("* * * * *", () => {
  console.log("running the project schedule");
  // ProjectDayIncrement();
  if (isMidnightInPakistan()) {
    TaskDayIncrement();
  }
});

function DeleteExtraTask(id) {
  const sql = "DELETE FROM `intern_tasks` WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return true;
  });
}

const UploadTask = (req, res) => {
  const {
    projectId,
    taskId,
    etiId,
    taskImage,
    taskTitle,
    liveUrl,
    repoUrl,
    description,
    taskPoints,
  } = req.body.task;

  const taskData = [
    taskId,
    projectId,
    etiId,
    taskImage,
    taskTitle,
    liveUrl,
    repoUrl,
    description,
    taskPoints,
  ];

  // console.log(taskData);

  const sql =
    "INSERT INTO `submitted_task`(`task_id`, `project_id`, `eti_id`, `images`, `task_title`, `live_url`, `git_url`, `description`, `task_points`) VALUES (?)";
  connection.query(sql, [taskData], (err, data) => {
    if (err) throw err;
    if (data.insertId > 0) {
      const sql =
        "UPDATE `intern_tasks` SET `task_submit_status`= 1 WHERE `task_id` = ?";
      connection.query(sql, [taskId], (err, data) => {
        if (err) throw err;
        return res.json({ msg: "Task uploaded successfuly" });
      });
    }
  });
};

module.exports = {
  GetInternProjects,
  CreateTask,
  GetInternTasks,
  UploadTask,
  GetProjectDetail,
};
