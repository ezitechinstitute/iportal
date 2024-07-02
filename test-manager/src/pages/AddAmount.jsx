import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopHeader } from "../components/TopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddAmount = () => {
  const navigate = useNavigate();
  const [instructorMail, setInstructorMail] = useState([]);
  // const [managerMail, setManagerMail] = useState([]);
  const [data, setData] = useState({});

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);

  const [phoneQuery, setPhoneQuery] = useState("");
  const [phoneSuggestions, setPhoneSuggestions] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(false);

  const check = sessionStorage.getItem("isLoggedIn");
  const managerEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const GetInstructorEmails = async () => {
    try {
      const res = await axios.get(
        "https://api.ezitech.org/get-instructor-emails"
      );
      setInstructorMail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetInstructorEmails();
    // GetManagerEmails();
  }, [GetInstructorEmails]);

  const handleQuery = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handlePhoneQuery = async (e) => {
    const value = e.target.value;
    setPhoneQuery(value);
    if (value.length > 2) {
      fetchPhone(value);
    } else {
      setPhoneSuggestions([]);
    }
  };

  const fetchSuggestions = async (queryFinal) => {
    try {
      const res = await axios.post(
        "https://api.ezitech.org/get-intern-emails",
        {
          queryFinal,
        }
      );
      //   const data = await res.json();
      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPhone = async (finalPhone) => {
    try {
      const res = await axios.post("https://api.ezitech.org/get-intern-phone", {
        finalPhone,
      });
      console.log(res.data);
      setPhoneSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectEmail = (e) => {
    setQuery(e);
    setData({ ...data, internEmail: e });
    setSelected(true);
  };

  const selectPhone = (e) => {
    setPhoneQuery(e);
    setData({ ...data, internPhone: e });
    setSelectedPhone(true);
  };
  // https://api.ezitech.org/add-amount
  const SubmitAmount = (e) => {
    e.preventDefault();
    setData({ ...data, managerMail: managerEmail });
    // console.log(data);

    if (
      data.amount !== undefined &&
      data.instructorEmail !== undefined &&
      data.internEmail !== undefined
    ) {
      if (data.managerMail !== undefined) {
        axios
          .post("https://api.ezitech.org/add-amount", { data })
          .then((res) => {
            alert(res.data);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Are you sure?");
      }
    } else {
      alert("Fill Empty Fields First!!!");
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar />

        <div className="main">
          <TopHeader />

          <main class="content px-3 py-2">
            <div class="container-fluid">
              <div
                class="mt-4 mb-5"
                // style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
                aria-label="breadcrumb"
              >
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </div>
              <div class="card border-0 shadow">
                <div class="card-header">
                  <h3 class="card-title">Add Amount</h3>
                  <form>
                    <div className="row mt-5">
                      <div className="col-sm-3">
                        <label htmlFor="">Enter Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Amount"
                          name="amount"
                          onChange={handleInput}
                        />
                      </div>

                      <div className="col-sm-3">
                        <label htmlFor="">Instructor Email</label>
                        <select
                          name="instructorEmail"
                          id=""
                          className="form-control"
                          onChange={handleInput}
                        >
                          <option selected disabled>
                            --Select--
                          </option>
                          {Array.isArray(instructorMail)
                            ? instructorMail.map((rs) => (
                                <option value={rs.email}>{rs.email}</option>
                              ))
                            : " "}
                        </select>
                      </div>

                      {/* <div className="col-sm-3">
                        <label htmlFor="">Manager Email</label>
                        <select
                          name="managerEmail"
                          id=""
                          className="form-control"
                          onChange={handleInput}
                        >
                          <option selected disabled>
                            --Select--
                          </option>
                          {Array.isArray(managerMail)
                            ? managerMail.map((rs) => (
                                <option value={rs.email}>{rs.email}</option>
                              ))
                            : " "}
                        </select>
                      </div> */}

                      <div className="col-sm-3">
                        <label for="email-id-column">Intern Email</label>
                        <input
                          type="text"
                          id="email-id-column"
                          value={query}
                          onChange={handleQuery}
                          className="form-control"
                          name="email"
                          placeholder="Search Intern Email"
                        />

                        <ul style={{ listStyle: "none" }}>
                          {!selected
                            ? suggestions.map((email, index) => (
                                <>
                                  <li
                                    className="border shadow rounded p-1"
                                    key={index}
                                    onClick={() => selectEmail(email.email)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {email.email}
                                  </li>
                                </>
                              ))
                            : " "}
                        </ul>
                      </div>

                      <div className="col-sm-3">
                        <label for="email-id-column">Intern Phone</label>
                        <input
                          type="text"
                          id="email-id-column"
                          value={phoneQuery}
                          onChange={handlePhoneQuery}
                          className="form-control"
                          name="phone"
                          placeholder="Search Intern Phone"
                        />

                        <ul style={{ listStyle: "none" }}>
                          {!selectedPhone
                            ? phoneSuggestions.map((phone, index) => (
                                <>
                                  <li
                                    className="border shadow rounded p-1"
                                    key={index}
                                    onClick={() => selectPhone(phone.phone)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {phone.phone}
                                  </li>
                                </>
                              ))
                            : " "}
                        </ul>
                      </div>

                      <div className="text-center mt-5">
                        <button
                          className="btn btn-primary"
                          onClick={SubmitAmount}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
