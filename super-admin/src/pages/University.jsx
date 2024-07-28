import React from 'react'
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from 'react-router-dom';

const University = () => {
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
                    <h4 className="card-title">Universities</h4>

                    <div class="ag-btns d-flex flex-wrap">
                      <input type="text" class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0" id="filter-text-box" placeholder="Search...." />
                      <div class="btn-export">
                        <div class="modal-size-lg d-inline-block">
                          {/* <!-- Button trigger modal --> */}
                          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#large">
                            Add University
                          </button>
                        </div>
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
                                  <th>Email</th>
                                  <th>Phone no</th>
                                  <th class="cell-fit">Total- Interns</th>
                                  <th>Action</th>

                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                  <td> <button class="btn btn-warning">Action</button></td>

                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                  <td> <button class="btn btn-warning">Action</button></td>

                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                  <td> <button class="btn btn-warning">Action</button></td>

                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                  <td> <button class="btn btn-warning">Action</button></td>

                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
                                  <td>mmmmmmaaaaatttttttt---</td>
                                  <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                  <td> <button class="btn btn-warning">Action</button></td>

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

          <div class="modal fade text-left" id="large" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel17">Edit University</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="card-body">
                    <div class="row">
                      <div class=" col-lg-12 col-md-12 col-12">
                        <div class="card-body">
                          <form class="form form-horizontal d-flex">
                            <div class="row ">
                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="first-name">Name</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="text" id="first-name" class="form-control" name="fname" placeholder="First Name" />
                                  </div>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="email-id">Email</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="email" id="email-id" class="form-control" name="email-id" placeholder="Email" />
                                  </div>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="contact-info">Password</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="password" id="contact-info" class="form-control" name="contact" placeholder="password" />
                                  </div>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="Phone-no">Phone-No</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="email" id="email-id" class="form-control" name="email-id" placeholder="phone no" />
                                  </div>
                                </div>
                              </div>

                            </div>
                          </form>
                        </div>

                      </div>
                    </div>
                  </div>


                </div>

                <div class="modal-footer">
                  {/* <button type="button" class="btn btn-primary" data-dismiss="modal">Add Field</button> */}
                  <button type="button" class="btn btn-primary" data-dismiss="modal">submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
</div>
</div> */}

    </>
  )
}

export default University