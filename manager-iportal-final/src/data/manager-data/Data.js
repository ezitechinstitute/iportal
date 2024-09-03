import axios from "axios";
const token = sessionStorage.getItem("token");
const managerid = sessionStorage.getItem("managerid");


export const CountInterview = async () => {
  try {
    const res = await axios.get(`https://api.ezitech.org/count-interview/${managerid}`, {
      headers: { "x-access-token": token },
    });
    return res.data.count;
  } catch (error) {
    console.log(error);
  }
};

export const CountTest = async () => {
  try {
    const res = await axios.get(`https://api.ezitech.org/count-test/${managerid}`, {
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
      `https://api.ezitech.org/count-test-completed/${managerid}`,
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
    const res = await axios.get(`https://api.ezitech.org/count-contact-with/${managerid}`, {
      headers: { "x-access-token": token },
    });
    return res.data.count;
  } catch (error) {
    console.log(error);
  }
};
