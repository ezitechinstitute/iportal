const { connection } = require("../../config/connection");


const GetLatestRegister = (req, res) => {
    const sql = "SELECT * FROM `intern_table` ORDER BY `id` DESC LIMIT 5";
    connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
}


const GetOnsiteInterview = (req, res) => {
    const sql = "SELECT * FROM `intern_table` WHERE `interview_type` = 'Onsite'  ORDER BY `id` DESC";
     connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
}

const GetRemoteInterview = (req, res) => {
    const sql = "SELECT * FROM `intern_table` WHERE `interview_type` = 'Remote'  ORDER BY `id` DESC";
     connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
}



module.exports = {GetLatestRegister, GetOnsiteInterview, GetRemoteInterview};