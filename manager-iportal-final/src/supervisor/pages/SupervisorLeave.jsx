import React from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";

const SupervisorLeave = () => {
  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />

      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Leave</h4>

                      <div class="ag-btns d-flex flex-wrap">
                        <input
                          type="text"
                          class="ag-grid-filter form-control w-100 mr-1 mb-1 mb-sm-0 btn1"
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
                                    <th>From-Date</th>
                                    <th>To-Date</th>
                                    <th class="cell-fit">Reason</th>
                                    <th>Days</th>
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
                                    <td>
                                      {" "}
                                      <button class="btn btn-danger">
                                        Pending
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
                                    <td>
                                      {" "}
                                      <button class="btn btn-success">
                                        Approved
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
                                    <td>
                                      {" "}
                                      <button class="btn btn-danger">
                                        Pending
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
      </div>
    </>
  );
};

export default SupervisorLeave;
