import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import "./Intern.css";
import { useNavigate } from "react-router-dom";

const Intern = () => {
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

          <section id="complex-header-datatable">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header border-bottom">
                    <h2 class="card-title">Interns</h2>

                    <div class="ag-btns d-flex flex-wrap">
                      <div
                        class="btn-export"
                        style={{
                          marginRight: "20px",
                        }}
                      >
                        <button class="btn btn-primary btn1 ag-grid-export-btn">
                          Onsite-Interns
                        </button>
                      </div>
                      <div class="btn-export">
                        <button class="btn btn-primary ag-grid-export-btn">
                          Remote-Interns
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="card-datatable">
                    <table class="dt-complex-header table table-bordered table-responsive">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Intern ID</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th class="cell-fit">Duration</th>
                          <th>Join Date</th>
                          <th>Technology</th>
                          <th>Attendence</th>
                          <th>Projects</th>
                          <th>Allow</th>
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
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
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
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
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
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
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
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
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
    </>
  );
};

export default Intern;
