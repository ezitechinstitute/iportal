import React from "react";
import ProjectBtn from "../ProjectBtn";

const Completed = () => {
  return (
    <>
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body"></div>
          {/* <button type="button" class="btn btn-primary" ><span className='btn2' ><i data-feather='loader' style={{
                                                marginRight: "5px",
                                                color: "white"
                                            }}></i> On-going</span></button> */}
          <div className="row" id="basic-table">
            <div className="col-12">
              <div
                className="card"
                style={{
                  width: "1105px",
                }}
              >
                <div className="card-header">
                  <h2 className="card-Ptitle">Projects</h2>
                </div>
                <div className="pro-btns">
                  <div class="demo-inline-spacing">
                    <ProjectBtn />

                    {/* const onGoing = () => ( */}
                  </div>
                </div>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>TASKS</th>
                  <th>PROGRESS</th>
                  <th>DAYS</th>
                  <th>STATUS</th>
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

          <footer
            class="footer footer-static footer-light"
            style={{
              padding: "0px",
              margin: "0px",
              marginTop: "60px",
            }}
          >
            <div></div>
            <p
              class="clearfix mb-0"
              style={{
                marginleft: "10px",
              }}
            >
              <span class=" mt-25">
                COPYRIGHT &copy; 2024
                <a
                  class="ml-25"
                  href="https://ezitech.org/html-css-internship-opportunities/"
                  target="_blank"
                >
                  Ezitech Institute
                </a>
                <span class="d-none d-sm-inline-block">
                  , All rights Reserved
                </span>
              </span>
              <span class="float-md-right d-none d-md-block">
                <a
                  href="https://www.facebook.com/"
                  style={{
                    color: "#75727f",
                  }}
                >
                  <i
                    class="mr-1 "
                    data-feather="facebook"
                    style={{ color: "#5E5873" }}
                  ></i>
                </a>

                <a href="https://www.instagram.com/">
                  <i
                    class="mr-1 "
                    data-feather="instagram"
                    style={{
                      color: "#75727f",
                      marginleft: "15px",
                      // backgroundColor:"pink"
                    }}
                  ></i>
                </a>

                <a href="https://www.linkedin.com/">
                  <i
                    class="mr-1 "
                    data-feather="linkedin"
                    style={{
                      color: "#75727f",
                      marginleft: "15px",
                      // backgroundColor:"pink"
                    }}
                  ></i>
                </a>

                <a href="https://twitter.com/i/flow/login">
                  <i
                    class="mr-1 "
                    data-feather="youtube"
                    style={{
                      color: "#75727f",
                      marginleft: "15px",
                      // backgroundColor:"pink"
                    }}
                  ></i>
                </a>
              </span>
            </p>
          </footer>
        </div>
      </div>
      {/* ); */}
    </>
  );
};

export default Completed;
