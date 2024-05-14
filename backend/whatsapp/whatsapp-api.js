const {axios} = require("axios");
// const axios = require('axios/dist/node/axios.cjs');


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
      instance_id: "6640DB6188172",
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

If you have any questions or need further assistance, feel free to reach out to us at +1 (737) 235-7111.

We look forward to meeting you during the interview process!

Best regards`,
      instance_id: "6640DB980CC35",
      access_token: "6635ec7382039",
    });
  } catch (error) {
    console.log(error);
  }
}




module.exports = {SendMessageRemote, SendMessageOnsite}