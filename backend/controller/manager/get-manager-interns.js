const { connection } = require("../../config/connection");

const GetManagerOnsite = (req, res) => {
  const sql =
    "SELECT `id`, `name`, `image`, `duration`, `technology`, `status` FROM `intern_table` WHERE `intern_type` = 'Onsite' AND `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetManagerRemote = (req, res) => {
  const sql =
    "SELECT `id`, `name`, `image`, `duration`, `technology`, `status` FROM `intern_table` WHERE `intern_type` = 'Remote' AND `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const OnsiteSingle = (req, res) => {
  const { id } = req.body;

  const sql = "SELECT * FROM `intern_table`  WHERE `id` = (?)";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const RemoteSingle = (req, res) => {
  const { id } = req.body;

  const sql = "SELECT * FROM `intern_table`  WHERE `id` = (?)";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetInternsEmail = (req, res) => {
  const check = req.body.queryFinal;
  const checkFinal = "%" + check + "%";

  // console.log(req.body);

  const sql = "SELECT email FROM intern_accounts WHERE email LIKE (?)";
  connection.query(sql, [checkFinal], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetInternsPhone = (req, res) => {
  const check = req.body.finalPhone;
  const checkFinal = "%" + check + "%";

  console.log(req.body);

  const sql = "SELECT phone FROM intern_table WHERE phone LIKE (?)";
  connection.query(sql, [checkFinal], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      console.log(data);
      return res.json(data);
    }
  });
};
// const CountOnsite = (req, res) => {
//   let month = new Date().getMonth() + 1;
//   let currentMonth = "0" + month.toLocaleString();

//   console.log(currentMonth);

//   const sql = "SELECT `join_date` FROM `intern_table`";
//   connection.query(sql, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       // console.log(data)
//       for (let i = 0; i < data.length; i++) {
//         console.log(data[i].join_date.slice(0, 7));
//       }
//     }
//   });
// };

module.exports = {
  GetManagerOnsite,
  GetManagerRemote,
  OnsiteSingle,
  RemoteSingle,
  GetInternsEmail,
  GetInternsPhone,
  // CountOnsite,
};
