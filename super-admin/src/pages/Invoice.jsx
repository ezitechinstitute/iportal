import React from "react";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />

      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body"></div>

          <div class="col-12 col-xl-12 col-md-12">
            <div class="card card-statistics">
              <div class="card-header">
                <h1
                  class="card-title"
                  style={{
                    fontSize: "30px",
                    marginLeft: "-15px",
                  }}
                >
                  Invoice
                </h1>
                <div class="d-flex align-items-center"></div>
              </div>
            </div>
          </div>

          {/* <!-- Subscribers Chart Card starts --> */}
          <section id="dashboard-analytics">
            <div class="row match-height">
              <div class="col-lg-4 col-sm-6 col-12">
                <div class="card pb-2">
                  <div class="card-header flex-column align-items-center pb-0">
                    <h2 class="font-weight-bolder mt-1">92.6k</h2>
                    <p class="card-text">Total Amount</p>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}

              {/* <!-- Subscribers Chart Card starts --> */}
              <div class="col-lg-4 col-sm-6 col-12 ">
                <div class="card pb-2">
                  <div class="card-header flex-column align-items-center pb-0">
                    <h2 class="font-weight-bolder mt-1">92.6k</h2>
                    <p class="card-text">Receive Amount</p>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}

              {/* <!-- Subscribers Chart Card starts --> */}
              <div class="col-lg-4 col-sm-6 col-12">
                <div class="card pb-2">
                  <div class="card-header flex-column align-items-center pb-0">
                    <h2 class="font-weight-bolder mt-1">92.6k</h2>
                    <p class="card-text">Remaining Amount</p>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}
            </div>
          </section>

          <div class="card-datatable">
            <table class="dt-complex-header table table-bordered table-responsive">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice Id</th>
                  <th>User Name</th>
                  <th>Phone no</th>
                  <th class="cell-fit">Technology</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

                <tr>
                  <td>1111</td>
                  <td>Faisal Bank</td>
                  <td>00000000000000000000000</td>
                  <td>mmmmmmaaaaatttttttt---</td>
                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                  <td>12645667</td>
                  <td>12345678</td>
                  <td>asdfghj</td>
                  <td>
                    {" "}
                    <span class="btn btn-success">Full-Paid</span>
                  </td>
                  <td>
                    <div className="d-flex ">
                      <button
                        class="btn btn-info mr-1"
                        style={{
                          padding: "5px 15px",
                        }}
                      >
                        <i data-feather="eye"></i>
                      </button>
                      <button
                        class="btn btn-danger"
                        style={{
                          padding: "5px 15px",
                        }}
                      >
                        <i data-feather="x-circle"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>1111</td>
                  <td>Faisal Bank</td>
                  <td>00000000000000000000000</td>
                  <td>mmmmmmaaaaatttttttt---</td>
                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                  <td>12645667</td>
                  <td>12345678</td>
                  <td>asdfghj</td>
                  <td>
                    {" "}
                    <button class="btn btn-primary">Half-paid</button>
                  </td>

                  <td>
                    <div className="d-flex ">
                      <button
                        class="btn btn-info mr-1"
                        style={{
                          padding: "5px 15px",
                        }}
                      >
                        <i data-feather="eye"></i>
                      </button>
                      <button
                        class="btn btn-danger"
                        style={{
                          padding: "5px 15px",
                        }}
                      >
                        <i data-feather="x-circle"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>1111</td>
                  <td>Faisal Bank</td>
                  <td>00000000000000000000000</td>
                  <td>mmmmmmaaaaatttttttt---</td>
                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                  <td>12645667</td>
                  <td>12345678</td>
                  <td>asdfghj</td>
                  <td>
                    {" "}
                    <button class="btn btn-secondary">Generated</button>
                  </td>
                  <td>
                    <div className="d-flex ">
                      <button
                        class="btn btn-info mr-1"
                        style={{
                          padding: "5px 15px",
                        }}
                      >
                        <i data-feather="eye"></i>
                      </button>
                      <button
                        class="btn btn-danger"
                        style={{
                          padding: "5px 15px",
                        }}
                      >
                        <i data-feather="x-circle"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
