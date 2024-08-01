import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";
import axios from "axios";

export const RemainingAmount = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const GetRemainingAmount = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/pending-amount", {
        headers: { "x-access-token": token },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetRemainingAmount();
  }, [GetRemainingAmount]);

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              {/* <!-- Statistics Card --> */}
              {/* <InternStatics /> */}
              {/* <!--/ Statistics Card --> */}

              {/* <!-- Table Hover Animation start --> */}
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Remaining Amount</h4>
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Add Intern
                      </button>
                    </div>

                    <div className="card-body overflow-x-scroll text-center">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(data)
                            ? data.map((rs) => {
                                const {
                                  id,
                                  name,
                                  email,
                                  contact,
                                  remaining_amount,
                                } = rs;

                                return (
                                  <>
                                    <tr>
                                      <td className="border px-1">{name}</td>
                                      <td className="border px-1">{email}</td>
                                      <td className="border px-1">{contact}</td>
                                      <td className="border px-1">
                                        {remaining_amount}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            : " "}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
