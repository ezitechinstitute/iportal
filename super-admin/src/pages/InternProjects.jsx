import React, { useEffect, useRef, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";

export const InternProjects = () => {
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
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Projects</h4>

                      <div class="ag-btns d-flex flex-wrap">
                        <input
                          type="text"
                          class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0"
                          id="filter-text-box"
                          placeholder="Search...."
                        />
                        <div class="btn-export">
                          <button class="btn btn-primary ag-grid-export-btn">
                            Add Projects
                          </button>
                        </div>
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
                                    <th>Title</th>
                                    <th>Start Date</th>
                                    <th class="cell-fit">Duration</th>
                                    <th>Days</th>
                                    <th>Tasks</th>
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
                                    <td
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                    >
                                      12645667
                                    </td>
                                    <td>12345678</td>
                                    <td>asdfghj</td>
                                    <td>
                                      <div class="btn-group">
                                        <button
                                          class="btn btn-warning dropdown-toggle"
                                          type="button"
                                          id="dropdownMenuButton5"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Action
                                        </button>
                                        <div
                                          class="dropdown-menu"
                                          aria-labelledby="dropdownMenuButton5"
                                        >
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            Edit
                                          </a>
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            Freeze
                                          </a>
                                        </div>
                                      </div>
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
                                    <td
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                    >
                                      12645667
                                    </td>
                                    <td>12345678</td>
                                    <td>asdfghj</td>
                                    <td>
                                      <div class="btn-group">
                                        <button
                                          class="btn btn-warning dropdown-toggle"
                                          type="button"
                                          id="dropdownMenuButton5"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Action
                                        </button>
                                        <div
                                          class="dropdown-menu"
                                          aria-labelledby="dropdownMenuButton5"
                                        >
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            Edit
                                          </a>
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            Freeze
                                          </a>
                                        </div>
                                      </div>
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
                                    <td
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                    >
                                      12645667
                                    </td>
                                    <td>12345678</td>
                                    <td>asdfghj</td>
                                    <td>
                                      <div class="btn-group">
                                        <button
                                          class="btn btn-warning dropdown-toggle"
                                          type="button"
                                          id="dropdownMenuButton5"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Action
                                        </button>
                                        <div
                                          class="dropdown-menu"
                                          aria-labelledby="dropdownMenuButton5"
                                        >
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            Edit
                                          </a>
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            Freeze
                                          </a>
                                        </div>
                                      </div>
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
