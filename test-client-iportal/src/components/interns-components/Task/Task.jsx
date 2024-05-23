import React from 'react'
import "./Task.css";
const Task = () => {
    return (
        <>
            <div className="app-content content ">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body"></div>
                    <div class="row" id="basic-table">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">TASKS</h4>
                                    <button class="btn btn-primary">
                                        <i data-feather="edit" class="d-block d-md-none"></i>
                                
                                        <span type="button" class="" data-toggle="modal" data-target="#large">
                                            Create Task
                                        </span>
                                        {/* <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#large">
                                                Large Modal
                                            </button> */}
                                    </button>
                                    {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                            <div class="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                                                <ul class="nav nav-pills mb-0">
                                                    <li class="nav-item">
                                                        <a class="nav-link font-weight-bold active" href="javascript:void(0)">
                                                            <span class="d-none d-md-block">Feed</span>
                                                            <i data-feather="rss" class="d-block d-md-none"></i>
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link font-weight-bold" href="javascript:void(0)">
                                                            <span class="d-none d-md-block">About</span>
                                                            <i data-feather="info" class="d-block d-md-none"></i>
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link font-weight-bold" href="javascript:void(0)">
                                                            <span class="d-none d-md-block">Photos</span>
                                                            <i data-feather="image" class="d-block d-md-none"></i>
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link font-weight-bold" href="javascript:void(0)">
                                                            <span class="d-none d-md-block">Friends</span>
                                                            <i data-feather="users" class="d-block d-md-none"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                               
                                                <button class="btn btn-primary">
                                                    <i data-feather="edit" class="d-block d-md-none"></i>
                                                    <span class="font-weight-bold d-none d-md-block">Edit</span>
                                                </button>
                                            </div>
                                        </div> */}
                                </div>

                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>DATE</th>
                                                <th>TIME</th>
                                                <th>TASK NAME</th>
                                                <th>PROJECT</th>
                                                <th>PROGRESS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="footer footer-static footer-light" style={{
                    padding: "0px",
                    margin: "0px",
                    marginTop: "145px"

                }}>
                    <div></div>
                    <p class="clearfix mb-0" style={{
                        marginleft: "10px"
                    }}>
                        <span class=" mt-25">COPYRIGHT &copy; 2024<a class="ml-25" href="https://ezitech.org/html-css-internship-opportunities/" target="_blank">Ezitech Institute</a><span class="d-none d-sm-inline-block">, All rights Reserved</span></span><span class="float-md-right d-none d-md-block">

                            <a href="https://www.facebook.com/" style={{
                                color: "#75727f"
                            }}><i class="mr-1 " data-feather='facebook' style={{ color: "#5E5873" }}></i></a>

                            <a href="https://www.instagram.com/"><i class="mr-1 " data-feather='instagram'
                                style={{
                                    color: "#75727f",
                                    marginleft: "15px",
                                    // backgroundColor:"pink"
                                }}></i></a>

                            <a href="https://www.linkedin.com/"><i class="mr-1 " data-feather='linkedin' style={{
                                color: "#75727f",
                                marginleft: "15px",
                                // backgroundColor:"pink"
                            }}></i></a>



                            <a href="https://twitter.com/i/flow/login"><i class="mr-1 " data-feather='youtube' style={{
                                color: "#75727f",
                                marginleft: "15px",
                                // backgroundColor:"pink"
                            }}></i></a>

                        </span></p>
                </footer>

                <div class="modal fade text-left" id="large" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel17">Create Task</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="form">
                                    <div class="row">
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <label for="first-name-column">First Name</label>
                                                <input type="text" id="first-name-column" class="form-control" placeholder="First Name" name="fname-column" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <label for="last-name-column">Last Name</label>
                                                <input type="text" id="last-name-column" class="form-control" placeholder="Last Name" name="lname-column" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <label for="city-column">City</label>
                                                <input type="text" id="city-column" class="form-control" placeholder="City" name="city-column" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <label for="country-floating">Country</label>
                                                <input type="text" id="country-floating" class="form-control" name="country-floating" placeholder="Country" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <label for="company-column">Company</label>
                                                <input type="text" id="company-column" class="form-control" name="company-column" placeholder="Company" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <label for="email-id-column">Email</label>
                                                <input type="email" id="email-id-column" class="form-control" name="email-id-column" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button type="reset" class="btn btn-primary mr-1">Submit</button>
                                            <button type="reset" class="btn btn-outline-secondary">Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-primary" data-dismiss="modal">Accept</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task