const { connection } = require("../../config/connection");


const GetLatestRegister = (req, res) => {
    const sql = "SELECT * FROM `intern_table` ORDER BY `id` DESC LIMIT 5";
    connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    });
};


const GetOnsiteInterview = (req, res) => {
    const sql = "SELECT * FROM `intern_table` WHERE `interview_type` = 'Onsite' AND `status` = 'Interview' ORDER BY `id` DESC";
     connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    });
};

const GetRemoteInterview = (req, res) => {
    const sql = "SELECT * FROM `intern_table` WHERE `interview_type` = 'Remote' AND `status` = 'Interview'";
     connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    });
};

const GetTestIntern = (req, res) => {
    const sql = "SELECT * FROM `intern_table` WHERE `status` = 'Test'";
    connection.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    });
};




module.exports = {
    GetLatestRegister,
    GetOnsiteInterview,
    GetRemoteInterview,
    GetTestIntern
};