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

const GetInternProjectTask = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT pt.*, ia.name, ip.* FROM `project_tasks` pt JOIN intern_accounts ia ON pt.eti_id = ia.eti_id JOIN intern_projects ip ON pt.project_id = ip.project_id WHERE pt.project_id = ?";
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

const GetTaskDetail = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT task_title, task_description FROM `intern_tasks` WHERE `task_id` = ?";
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
    "INSERT INTO `project_tasks`(`project_id`, `eti_id`, `task_title`, `t_start_date`, `t_end_date`, `task_duration`) VALUES (?)";
  connection.query(sql, [values], (err, data) => {
    if (err) throw err;
    let lastId = data.insertId;

    const sql =
      "SELECT COUNT(*) as tasksCount FROM `project_tasks` WHERE `project_id` = ?";
    connection.query(sql, [projectId], (reject, resolve) => {
      if (err) throw err;
      if (resolve[0].tasksCount <= 3) {
        let taskPoint = points / resolve[0].tasksCount;

        console.log(taskPoint);

        const sql =
          "UPDATE `project_tasks` SET `task_mark` = ? WHERE `project_id` = ?";
        connection.query(sql, [taskPoint, projectId], (err, result) => {
          if (err) throw err;
          return res.json({ msg: "Task created successfully" });
        });
      } else {
        DeleteExtraTask(lastId);
        return res.json({ msg: "Task limit exceeds!!!" });
      }
    });
  });
};

const GetInternTasks = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT * FROM intern_tasks WHERE intern_tasks.eti_id = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const TaskDayIncrement = (req, res) => {
  const sql1 =
    "SELECT task_id, task_days, task_duration, t_end_date FROM intern_tasks WHERE task_status = 'Ongoing'";
  connection.query(sql1, (err, data1) => {
    if (err) {
      return res.json(err);
    } else {
      for (let i = 0; i < data1.length; i++) {
        const task = data1[i];

        if (
          task.task_days < task.task_duration &&
          task.t_end_date >= new Date()
        ) {
          const updatedDays = task.task_days + 1;
          const sql2 =
            "UPDATE intern_tasks SET task_days = ? WHERE task_id = ?";
          connection.query(sql2, [updatedDays, task.task_id], (err, data2) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Updated task_days for task ID ${task.task_id}`);
            }
          });
        } else if (task.t_end_date <= new Date()) {
          const sql2 =
            "UPDATE intern_tasks SET task_status = 'Expired' WHERE task_id = ?";
          connection.query(sql2, [task.task_id], (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Updated task_status to 'Expired' for task ID ${task.task_id}`
              );
            }
          });
        }
      }
    }
  });
};

function DeleteExtraTask(id) {
  const sql = "DELETE FROM `intern_tasks` WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return true;
  });
}

const UploadTask = (req, res) => {
  const { taskId, taskImage, liveUrl, repoUrl, description } = req.body.task;

  // const taskData = [taskImage, liveUrl, repoUrl, description];

  // console.log(taskData);

  const sql =
    "UPDATE `intern_tasks` SET `task_screenshot`= ?, `task_live_url`= ?, `task_git_url`= ?, `submit_description`= ? WHERE `task_id` = ?";
  connection.query(
    sql,
    [taskImage, liveUrl, repoUrl, description, taskId],
    (err, data) => {
      if (err) throw err;
      return res.json({ msg: "Task uploaded successfuly" });
    }
  );
};

module.exports = {
  GetInternProjects,
  CreateTask,
  GetInternTasks,
  UploadTask,
  GetProjectDetail,
  GetTaskDetail,
  TaskDayIncrement,
  GetInternProjectTask,
};
