import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopHeader } from "../components/TopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddAmount = () => {
  const navigate = useNavigate();
  const [instructorMail, setInstructorMail] = useState([]);
  const [managerMail, setManagerMail] = useState([]);
  const [data, setData] = useState({});

  const check = sessionStorage.getItem("isLoggedIn");

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
        "http://localhost:8800/get-instructor-emails"
      );
      setInstructorMail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetManagerEmails = async () => {
    try {
      const res = await axios.get("http://localhost:8800/get-manager-emails");
      setManagerMail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetInstructorEmails();
    GetManagerEmails();
  }, [GetInstructorEmails, GetManagerEmails]);

  const SubmitAmount = () => {
    if (
      data.amount !== undefined &&
      data.instructorEmail !== undefined &&
      data.managerEmail !== undefined
    ) {
      axios
        .post("http://localhost:8800/add-amount", { data })
        .then((res) => {
          console.log(res.data);
          alert(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
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
                      <div className="col-sm-4">
                        <label htmlFor="">Enter Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Amount"
                          name="amount"
                          onChange={handleInput}
                        />
                      </div>

                      <div className="col-sm-4">
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

                      <div className="col-sm-4">
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
