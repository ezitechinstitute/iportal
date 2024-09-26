import React from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";

const SupervisorBalance = () => {
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

          <div class="col-xl-12 col-md-12 col-12">
            <div class="card card-congratulation-medal p-1">
              <div class="card-body">
                <h5>Congratulations 🎉 John!</h5>
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
                {/* <img
                        src="./images/coin.svg"
                        class="congratulation-medal"
                        alt="Medal Pic"
                        width={100}
                        style={{ marginTop: "85px" }}
                      /> */}
              </div>
            </div>
          </div>

          <div className="row" id="table-hover-animation">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Withdraw Details</h4>
                  {/* <!-- Button trigger modal --> */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorBalance;
