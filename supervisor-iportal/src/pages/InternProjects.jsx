import React from 'react'
import { ManagerSidebar } from '../components/ManagerSidebar'
import { ManagerTopbar } from '../components/ManagerTopbar'

const InternProjects = () => {
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
                      <h4 className="card-title">Projects</h4>

                      <div class="ag-btns d-flex flex-wrap">
                        <input type="text" class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0 btn1" id="filter-text-box" placeholder="Search...." />

                        <div class="btn-export">
                        <div class="modal-size-lg d-inline-block">
                          {/* <!-- Button trigger modal --> */}
                          <button type="button" class="btn btn-primary btn1" data-toggle="modal" data-target="#large">
                            Add Projects
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
                                    <td>Faisal khan</td>
                                    <td>asdfghjhgfdsdfghjhgfds</td>
                                    <td>mmmmmmaaaaatttttttt---</td>
                                    <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                    <td style={{
                                      backgroundColor: "red",
                                      color: "white"
                                    }}>12645667</td>
                                    <td>12345678</td>
                                    <td>asdfghj</td>
                                    <td>
                                      <div class="btn-group">
                                        <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Action
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                                          <a class="dropdown-item" href="javascript:void(0);">Edit</a>
                                          <a class="dropdown-item" href="javascript:void(0);">Freeze</a>

                                        </div>
                                      </div></td>

                                  </tr>

                                  <tr>
                                    <td>1111</td>
                                    <td>Faisal Bank</td>
                                    <td>00000000000000000000000</td>
                                    <td>mmmmmmaaaaatttttttt---</td>
                                    <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                    <td style={{
                                      backgroundColor: "red",
                                      color: "white"
                                    }}>12645667</td>
                                    <td>12345678</td>
                                    <td>asdfghj</td>
                                    <td>
                                      <div class="btn-group">
                                        <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Action
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                                          <a class="dropdown-item" href="javascript:void(0);">Edit</a>
                                          <a class="dropdown-item" href="javascript:void(0);">Freeze</a>

                                        </div>
                                      </div></td>

                                  </tr>

                                  <tr>
                                    <td>1111</td>
                                    <td>Faisal Bank</td>
                                    <td>00000000000000000000000</td>
                                    <td>mmmmmmaaaaatttttttt---</td>
                                    <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                    <td style={{
                                      backgroundColor: "red",
                                      color: "white"
                                    }}>12645667</td>
                                    <td>12345678</td>
                                    <td>asdfghj</td>
                                    <td>
                                      <div class="btn-group">
                                        <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Action
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                                          <a class="dropdown-item" href="javascript:void(0);">Edit</a>
                                          <a class="dropdown-item" href="javascript:void(0);">Freeze</a>

                                        </div>
                                      </div></td>

                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>


                    <div class="modal fade text-left" id="large" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel17">Add Project</h4>
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
                                    <label for="Project-name">Name</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="text" id="Project-name" class="form-control" name="Pname" placeholder="Project Name" />
                                  </div>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="Technology">Technology</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="Technology" id="Technology" class="form-control" name="Technology" placeholder="Technology" />
                                  </div>
                                </div>
                              </div>

                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="email-id">Staff</label>
                                  </div>

                                  <div class="form-group col-sm-9">
                                    <select class="form-control" id="basicSelect">
                                      <option>Select Staff</option>
                                      <option>Blade Runner</option>
                                      <option>Thor Ragnarok</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="Module">Module</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="Module" id="Module" class="form-control" name="Module" placeholder="Module" />
                                  </div>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label" id='date'>
                                    <label for="first-name">Start Date</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="date" id="first-name" class="form-control" name="fname" placeholder="First Name" />
                                  </div>
                                </div>
                              </div>


                              <div class="col-6">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label" id='date'>
                                    <label for="Duration">Duration</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input type="Duration" id="Duration" class="form-control" name="Duration" placeholder="Duration" />
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
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Add Field</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal">submit</button>
                </div>
              </div>
            </div>
          </div>



                  </div>
                </div>
              </div>
            </section>
                </div>
            </div>
        </>
    )
}

export default InternProjects