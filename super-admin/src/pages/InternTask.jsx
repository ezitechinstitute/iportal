import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import "./InternTask.css";
import { useNavigate } from "react-router-dom";

const InternTask = () => {
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

          <section id="dashboard-ecommerce">
            <div className="row" id="table-hover-animation">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Intern Tasks</h4>

                    <div class="ag-btns d-flex flex-wrap">
                      <input
                        type="text"
                        class="input1 ag-grid-filter form-control w-100 mr-1 mb-1 mb-sm-0"
                        id="filter-text-box"
                        placeholder="Search...."
                      />
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
                                  <th>Name</th>
                                  <th>Task Title</th>
                                  <th>Project Title</th>
                                  <th class="cell-fit">Started on</th>
                                  <th>Ended On</th>
                                  <th>Action</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">
                                    qwertyuiqwertyqwetyqwet
                                  </td>
                                  <td>12645667</td>
                                  <td>12345678</td>
                                  <td>asdfghj</td>
                                  <td>
                                    {" "}
                                    <button class="btn btn-success">
                                      View
                                    </button>
                                  </td>
                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">
                                    qwertyuiqwertyqwetyqwet
                                  </td>
                                  <td>12645667</td>
                                  <td>12345678</td>
                                  <td>asdfghj</td>
                                  <td>
                                    {" "}
                                    <button class="btn btn-success">
                                      View
                                    </button>
                                  </td>
                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">
                                    qwertyuiqwertyqwetyqwet
                                  </td>
                                  <td>12645667</td>
                                  <td>12345678</td>
                                  <td>asdfghj</td>
                                  <td>
                                    {" "}
                                    <button class="btn btn-success">
                                      View
                                    </button>
                                  </td>
                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">
                                    qwertyuiqwertyqwetyqwet
                                  </td>
                                  <td>12645667</td>
                                  <td>12345678</td>
                                  <td>asdfghj</td>
                                  <td>
                                    {" "}
                                    <button class="btn btn-success">
                                      View
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
          </section>
        </div>
      </div>
    </>
  );
};

export default InternTask;
