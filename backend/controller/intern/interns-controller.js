
const { connection } = require("../../config/connection");
const {
  SendMailRemote,
  SendMailOnsite
} = require("../../mail/mailer-controller");

// const {SendMessageRemote, SendMessageOnsite } = require("../../whatsapp/whatsapp-api.js");
const dotenv = require("dotenv").config();

const id = process.env.INSTANCEID;
const token = process.env.ACCESSTOKEN;



const RegisterInterns = (req, res) => {
  const {
    internUsername,
    internemail,
    internPhone,
    internCnic,
    internGender,
    internImage,
    internJoinDate,
    internDob,
    internUniversity,
    internDegree,
    interviewType,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  } = req.body.value;

  let data = [
    internUsername,
    internemail,
    internPhone,
    internCnic,
    internGender,
    internImage,
    internJoinDate,
    internDob,
    internUniversity,
    internDegree,
    interviewType,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  ];

  
  let flag = 0;
  
  const sql0 = "SELECT * FROM `intern_table` WHERE `email`= (?)";
  connection.query(sql0, [internemail], (err, data) => {
      if(err){
          return res.json(err);
      }else{
          if(data.length > 0){
              return res.json({exist: true});
          }else{
               flag = 1;
          }
      }
  });
  
  if(flag !== 1){
      const sql1 =
    "INSERT INTO `intern_table`(`name`, `email`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `interview_type`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

  connection.query(sql1, [data], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
         
      if (data.affectedRows === 1) {
         
        if (interviewType === "Remote") {
          SendMailRemote(
            internUsername,
            internemail,
            interviewDate,
            interviewTime
          );
        //   SendMessageRemote(
        //      internUsername,
        //      internPhone.slice(1, 13),
        //      interviewDate,
        //      interviewTime
        //   );
        } else {
        //   SendMessageOnsite(internPhone.slice(1, 13), internUsername);
          SendMailOnsite(internUsername, internemail);
        }
        
        return res.json(data.affectedRows);

        
      }
    }
  });
  }
  
  

  
      
};


module.exports = { RegisterInterns };
