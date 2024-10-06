import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { WithdrawRequest } from "../components/WithdrawRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SupervisorBalance = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  // headers: { "x-access-token": token }
  const check = sessionStorage.getItem("isLoggedIn");
  const supid = sessionStorage.getItem("managerid");
  const etiId = sessionStorage.getItem("etiId");

  const [reqData, setReqData] = useState({
    sid: null,
    seid: null,
  });

  useEffect(() => {
    if (!check) {
      navigate("/superviosr");
    }
  });

  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />

      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body"></div>

          {/* <div class="col-xl-12 col-md-12 col-12">
            <div class="card card-congratulation-medal p-1">
              <div class="card-body">
                <h5>Congratulations 🎉 {username}!</h5>
                <p class="card-text font-small-3">You have earn in March</p>
                <h3 class="mb-75 pt-70">
                  <a href="javascript:void(0);">PKR : 3,499</a>
                </h3>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{
                    marginTop: "-175px",
                    marginLeft: "785px",
                  }}
                >
                  Withdraw
                </button>
                <img
                        src="./images/coin.svg"
                        class="congratulation-medal"
                        alt="Medal Pic"
                        width={100}
                        style={{ marginTop: "85px" }}
                      />
              </div>
            </div>
          </div> */}

          <div className="row" id="table-hover-animation">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Withdraw Details</h4>
                  {/* <!-- Button trigger modal --> */}

                  <div class="ag-btns d-flex flex-wrap">
                    {/* <input
                        type="text"
                        class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0 btn1"
                        id="filter-text-box"
                        placeholder="Search...."
                      /> */}
                    {/* <label htmlFor="" style={{ marginTop: "8px" }}>
                        Select Rows
                      </label>
                      &nbsp;
                      <select
                        className="form-control w-25"
                        name=""
                        id=""
                        onChange={(e) => setDataLimit(e.target.value)}
                      >
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                        <option value={500}>500</option>
                      </select>
                      &nbsp; &nbsp;
                      <label htmlFor="" style={{ marginTop: "8px" }}>
                        Show By Status
                      </label>
                      &nbsp;
                      <select
                        name="pStatus"
                        id=""
                        className="ag-grid-filter form-control w-25"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      >
                        <option selected disabled>
                          All
                        </option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Expired">Expired</option>
                        <option value="Completed">Completed</option>
                      </select> */}

                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#defaultwithdraw"
                      onClick={() => setReqData({ sid: supid, seid: etiId })}
                    >
                      Withdraw Request
                    </button>
                  </div>
                </div>

                <section id="complex-header-datatable">
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div class="card-datatable">
                          <table class="dt-complex-header table table-bordered table-responsive">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th class="cell-fit">Time</th>
                                <th>Account No</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                              </tr>

                              <tr>
                                <td>1113</td>
                                <td>Muhammad asif ali</td>
                                <td>asifali051@gmail.com</td>
                                <td>0333-5059345</td>
                                <td class="cell-fit">Mobile development</td>
                                <td>on-site</td>
                                <td>
                                  {" "}
                                  <button class="btn btn-danger">
                                    Pending
                                  </button>
                                </td>
                              </tr>

                              <tr>
                                <td>1113</td>
                                <td>Muhammad asif ali</td>
                                <td>asifali051@gmail.com</td>
                                <td>0333-5059345</td>
                                <td class="cell-fit">Mobile development</td>
                                <td>on-site</td>
                                <td>
                                  {" "}
                                  <button class="btn btn-success">
                                    Approved
                                  </button>
                                </td>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <WithdrawRequest values={reqData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorBalance;
