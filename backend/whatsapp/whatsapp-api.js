// const axios = require("axios");
const axios = require("axios/dist/node/axios.cjs");

async function SendMessageRemote(phone) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
Registration Successful! Interview Process Details

We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community!🎉

Interview Process Details:

Our team contact with you as soon as possible.

Meeting Platform: WhatsApp

If you have any questions or need further assistance, feel free to reach out to us at help@ezitech.org

We look forward to meeting you during the interview process!

Best regards
  `,
      instance_id: "6658673F2A130",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

async function SendMessageOnsite(phone) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
Registration Successful! Interview Process Details

We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community!🎉

Interview Process Details:

Onsite Interview:

Days: Monday to Friday
Time: 11:00Am to 3:00Pm
Location: https://maps.app.goo.gl/Q78i6r1DifnBWJtA8

If you have any questions or need further assistance, feel free to reach out to us at help@ezitech.org

We look forward to meeting you during the interview process!

Best regards
  `,
      instance_id: "6640DB6188172",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

async function SendMessageOther(phone) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
Registration Successful! Interview Process Details

We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community!🎉

Interview Process Details:

Our team contact with you as soon as possible.

Meeting Platform: WhatsApp

If you have any questions or need further assistance, feel free to reach out to us at help@ezitech.org

We look forward to meeting you during the interview process!

Best regards
  `,
      instance_id: "6682624207C62",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

async function SendMessageAssignPortal(
  phone,
  name,
  email,
  password,
  managerContact
) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
Welcome to the Ezitech Institute IPortal! Your Portal Login Details

Dear ${name},

To help you get started, we have created an account for you on our company portal. Below are your login details:

Portal URL: https://interns.ezitech.org
Email: ${email}
Password:${password}

Internship Status : TEST

Please follow these steps to log in:

1. Click on the portal link above or copy and paste it into your browser
2. Enter your email address and temporary password

If you encounter any issues while logging in or have any questions, feel free to reach out at help@ezitech.org

Please contact your assign manager for queries & test submisson: ${managerContact} 


Best regards`,
      instance_id: "668CF6A5AB89E",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

async function SendInvoiceTotal(
  phone,
  i_mail,
  i_id,
  i_date,
  t_amount,
  rec_amount,
  m_mail
) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
💵 Payment Invoice 💵

Dear,

You have successfully completed your payment.

Invoice ID: ${i_id}
Created Date: ${i_date}

Payment Details:

Total Amount Rs: ${t_amount}
Received Amount Rs: ${rec_amount}

IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.

Received By: ${m_mail}

Regards :
Ezitech Institute`,
      instance_id: "668CF6A5AB89E",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

async function SendInvoiceRemaining(
  phone,
  i_mail,
  i_id,
  i_date,
  t_amount,
  rec_amount,
  rem_amount,
  d_date,
  m_mail
) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
💵 Payment Invoice 💵

Dear,

You have successfully completed your payment.

Invoice ID: ${i_id}
Created Date: ${i_date}

Payment Details:

Total Amount Rs: ${t_amount}
Received Amount Rs: ${rec_amount}
Remaining Amount Rs: ${rem_amount}
Due Date: ${d_date};

IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.

NOTE: We kindly request you to clear the remaining amount of Rs: ${rem_amount} before the due date of ${d_date}. Otherwise, your iportal deactivate. 

Received By: ${m_mail}

Regards :
Ezitech Institute`,
      instance_id: "6640DB980CC35",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

async function SendInvoiceOther(
  phone,
  i_mail,
  i_id,
  i_date,
  t_amount,
  rec_amount,
  m_mail
) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: phone,
      type: "text",
      message: `
💵 Payment Invoice 💵

Dear,

You have successfully completed your payment.

Invoice ID: ${i_id}
Created Date: ${i_date}

Payment Details:

Total Amount Rs: ${t_amount}
Received Amount Rs: ${rec_amount}

IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.

Received By: ${m_mail}

Regards :
Ezitech Institute`,
      instance_id: "6640DB980CC35",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  SendMessageRemote,
  SendMessageOnsite,
  SendMessageOther,
  SendMessageAssignPortal,
  SendInvoiceTotal,
  SendInvoiceRemaining,
  SendInvoiceOther,
};
