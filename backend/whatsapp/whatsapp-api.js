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

If you have any questions or need further assistance, feel free to reach out to us at +1 (737) 235-7111.

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

Our team contact with you as soon as possible.

Meeting Platform: WhatsApp

If you have any questions or need further assistance, feel free to reach out to us at +1 (737) 235-7111.

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

async function SendMessageAssignPortal(phone, name, email, password) {
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

Best regards`,
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
  SendMessageAssignPortal,
};
