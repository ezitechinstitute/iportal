import axios from "axios";
const token = sessionStorage.getItem("token");
const managerEmail = sessionStorage.getItem("email");


export const CountInterview = async () => {
  try {
    const res = await axios.get(`https://api.ezitech.org/count-interview/${managerEmail}`, {
      headers: { "x-access-token": token },
    });
    return res.data.count;
  } catch (error) {
    console.log(error);
  }
};

export const CountTest = async () => {
  try {
    const res = await axios.get(`https://api.ezitech.org/count-test/${managerEmail}`, {
      headers: { "x-access-token": token },
    });
    return res.data.count;
  } catch (error) {
    console.log(error);
  }
};

export const CountTestCompleted = async () => {
  try {
    const res = await axios.get(
      "https://api.ezitech.org/count-test-completed",
      {
        headers: { "x-access-token": token },
      }
    );
    return res.data.count;
  } catch (error) {
    console.log(error);
  }
};

export const CountContactWith = async () => {
  try {
    const res = await axios.get("https://api.ezitech.org/count-contact-with", {
      headers: { "x-access-token": token },
    });
    return res.data.count;
  } catch (error) {
    console.log(error);
  }
};
