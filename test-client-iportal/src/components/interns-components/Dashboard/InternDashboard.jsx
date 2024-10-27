import React, { useEffect, useState } from "react";
import "./InternDashboard.css";

import logo11 from "./mediaa/logo11.png";
import logo12 from "./mediaa/logo12.png";
import logo13 from "./mediaa/logo13.png";
import logo14 from "./mediaa/logo14.png";
import logo15 from "./mediaa/logo15.png";
import logo16 from "./mediaa/logo16.png";
import logo17 from "./mediaa/logo17.png";
import logo18 from "./mediaa/logo18.png";
import logo19 from "./mediaa/logo19.png";
import logo20 from "./mediaa/logo20.png";
import logo21 from "./mediaa/logo21.png";
import logo22 from "./mediaa/logo22.png";
import logo23 from "./mediaa/logo23.png";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GrInProgress } from "react-icons/gr";

// ...........................inline css............

//NOTE:- inline css use hoi ve hia laykin us ko bashak hata dain css file is original. wohii sahii kam kar rahii hia

export const InternDashboard = () => {
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const id = sessionStorage.getItem("eziId");
  // const id = "EZI-23-5-24/7832";

  const [totalProjects, setTotalProjects] = useState(0);
  const [inPorgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [holidays, setHolidays] = useState(0);
  const [leaves, setLeaves] = useState(0);

  if (!checkLoggedIn) {
    navigate("/");
  }

  const CountProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-proj`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setTotalProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountProgressProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-prog-proj`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setInProgress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountCompletedProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-comp-proj`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setCompleted(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountAttendance = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-attend`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountHolidays = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-holidays`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setHolidays(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountLeaves = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-leaves`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setLeaves(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CountProjects();
    CountProgressProjects();
    CountCompletedProjects();
    CountAttendance();
    CountHolidays();
    CountLeaves();
  });

  // counter javascript
  const speed = 200;
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const myNum = document.querySelectorAll(".count");
    setCounts(Array.from(myNum));
  }, []);

  useEffect(() => {
    const updateNumber = (myCount, targetCount, initCount) => {
      let incrementNumber = Math.floor(targetCount / speed);

      const update = () => {
        initCount = initCount + incrementNumber;
        myCount.innerText = initCount;

        if (initCount < targetCount) {
          setTimeout(() => {
            update();
          }, 9);
        }
      };

      update();
    };

    counts.forEach((myCount) => {
      let targetCount = parseInt(myCount.dataset.count);
      let initCount = +myCount.innerText;

      updateNumber(myCount, targetCount, initCount);
    });
  }, [counts]);

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {/* <!-- Dashboard --> */}
            <section id="dashboard-ecommerce">
              <div className="card card-congratulation-medal rounded-0">
                <div className="card-body">
                  <h3 className="roboto">Dashboard Statistics</h3>
                </div>
              </div>

              <div class="container-fluid" style={{ margintop: "-5px" }}>
                <div class=" row col-lg-12">
                  <marquee style={{ color: "#f88a1b" }}>
                    <p class="marquee">
                      14th Year Anniversary.
                      <span class="ezi">Ezitech Institute</span> has completed
                      14 years.3963 has completed their internship.Thanks all
                      for yours unconditional support
                    </p>
                  </marquee>
                </div>
                {/* ...........cards............... */}
                <div class="row">
                  <div class="col-lg-8 col-12">
                    <div class="row">
                      {/* card1 */}
                      <div class="col-lg-4 col-md-6 col-12">
                        <div>
                          <div
                            class="card1"
                            style={{
                              boxshadow: "0px 4px  #eae8fd",
                              marginright: "10px",
                            }}
                          >
                            <div class="card py-2">
                              <div class="d-flex">
                                <i
                                  class=" icon px-1 mx-1"
                                  style={{
                                    color: "#776cf0",
                                    backgroundcolor: "#eae8fd",
                                    borderradius: "5px",
                                    padding: "4px 5px",
                                  }}
                                >
                                  <i data-feather="grid"></i>
                                </i>
                                <h3>
                                  {totalProjects !== 0 ? totalProjects : 0}
                                </h3>
                              </div>
                              <div class="card-body pl-1 mt-1">
                                <h4
                                  class="card-title"
                                  style={{ marginbottom: "5px" }}
                                >
                                  Total Projects
                                </h4>
                                <p
                                  class="card-text"
                                  style={{
                                    display: "flex",
                                    paddingbottom: "0%",
                                    margintop: "14px",
                                  }}
                                >
                                  3.5% Total Progress
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* card 2 */}
                      <div class="col-lg-4 col-md-6 col-12">
                        <div>
                          <div
                            class="card2 "
                            style={{
                              boxshadow: "0px 4px #fff1e3",
                              marginright: "18px",
                            }}
                          >
                            <div class="card py-2">
                              <div class="d-flex">
                                <i
                                  class=" icon px-1 mx-1"
                                  style={{
                                    color: "#ffa146",
                                    backgroundcolor: "#fff1e3",
                                    borderradius: "5px",
                                    padding: "4px 5px",
                                  }}
                                >
                                  <i data-feather="loader"></i>
                                </i>
                                <h3>{inPorgress !== 0 ? inPorgress : 0}</h3>
                              </div>
                              <div class="card-body pl-1 mt-1">
                                <h4
                                  class="card-title"
                                  style={{ marginbottom: "5px" }}
                                >
                                  In Progress
                                </h4>
                                <p
                                  class="card-text"
                                  style={{
                                    display: "flex",
                                    paddingbottom: "0%",
                                    margintop: "14px",
                                  }}
                                >
                                  3.5% Total Progress
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* card 3 */}
                      <div class="col-lg-4 col-md-6 col-12">
                        <div>
                          <div
                            class="card3"
                            style={{
                              boxshadow: "0px 4px #fce5e6",
                            }}
                          >
                            <div class="card py-2">
                              <div class="d-flex">
                                <i
                                  class=" icon px-1 mx-1"
                                  style={{
                                    color: "#ec6566",
                                    backgroundcolor: "#fce5e6",
                                    borderradius: "5px",
                                    padding: "4px 5px",
                                  }}
                                >
                                  <i data-feather="menu"></i>
                                </i>
                                <h3>{completed !== 0 ? completed : 0}</h3>
                              </div>
                              <div class="card-body pl-1 mt-1">
                                <h4
                                  class="card-title"
                                  style={{ marginbottom: "5px" }}
                                >
                                  Complete Projects
                                </h4>
                                <p
                                  class="card-text"
                                  style={{
                                    display: "flex",
                                    paddingbottom: "0%",
                                    margintop: "14px",
                                  }}
                                >
                                  3.5% Total Progress
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* </div> */}
                      {/* <div class=" row"> */}

                      {/* card 4 */}
                      <div class="col-lg-4 col-md-6 col-12">
                        <div>
                          <div
                            class="card4"
                            style={{
                              boxshadow: "0px 4px #d9f8fc",
                              marginright: "18px",
                            }}
                          >
                            <div class="card py-2">
                              <div class="d-flex">
                                <i
                                  class=" icon px-1 mx-1"
                                  style={{
                                    color: "#29d6eb",
                                    backgroundcolor: "#d9f8fc",
                                    borderradius: "5px",
                                    padding: "4px 5px",
                                  }}
                                >
                                  <i data-feather="check-square"></i>
                                </i>
                                <h3>{attendance !== 0 ? attendance : 0}</h3>
                              </div>
                              <div class="card-body pl-1 mt-1">
                                <h4
                                  class="card-title"
                                  style={{ marginbottom: "5px" }}
                                >
                                  Total Attendence
                                </h4>
                                <p
                                  class="card-text"
                                  style={{
                                    display: "flex",
                                    paddingbottom: "0%",
                                    margintop: "14px",
                                  }}
                                >
                                  0 Last Week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* card 5 */}
                      <div class="col-lg-4 col-md-6 col-12">
                        <div>
                          <div
                            class="card5"
                            style={{
                              boxshadow: "0px 4px #dcf6e8",
                              marginright: "18px",
                            }}
                          >
                            <div class="card py-2">
                              <div class="d-flex">
                                <i
                                  class=" icon px-1 mx-1"
                                  style={{
                                    color: "#28c76f",
                                    backgroundcolor: "#dcf6e8",
                                    borderradius: "5px",
                                    padding: "4px 5px",
                                  }}
                                >
                                  <i data-feather="coffee"></i>
                                </i>
                                <h3>{holidays !== 0 ? holidays : 0}</h3>
                              </div>
                              <div class="card-body pl-1 mt-1">
                                <h4
                                  class="card-title"
                                  style={{ marginbottom: "5px" }}
                                >
                                  Holidays
                                </h4>
                                <p
                                  class="card-text"
                                  style={{
                                    display: "flex",
                                    paddingbottom: "0%",
                                    margintop: "14px",
                                  }}
                                >
                                  0 Last Week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* card 6 */}
                      <div class="col-lg-4 col-md-6 col-12">
                        <div>
                          <div
                            class="card6"
                            style={{
                              boxshadow: "0px 4px #fff0f8",
                              marginright: "18px",
                            }}
                          >
                            <div class="card py-2">
                              <div class="d-flex">
                                <i
                                  class=" icon px-1 mx-1"
                                  style={{
                                    color: "#ff8ac9",
                                    backgroundcolor: "#fff0f8",
                                    borderradius: "5px",
                                    padding: "4px 5px",
                                  }}
                                >
                                  <i data-feather="home"></i>
                                </i>
                                <h3>{leaves !== 0 ? leaves : 0}</h3>
                              </div>
                              <div class="card-body pl-1 mt-1">
                                <h4
                                  class="card-title"
                                  style={{ marginbottom: "5px" }}
                                >
                                  Leaves
                                </h4>
                                <p
                                  class="card-text"
                                  style={{
                                    display: "flex",
                                    paddingbottom: "0%",
                                    margintop: "14px",
                                  }}
                                >
                                  0 Last Week
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ..................read notes................ */}
                  <div class="cardd col-lg-4 col-md-6 col-12">
                    <div class="card card-congratulation-meda">
                      <div class="card-body">
                        <h5
                          class="notes mb-5 mr-1"
                          style={{
                            marginleft: "20px",
                            fontsize: "23px",
                          }}
                        >
                          Notifications
                        </h5>

                        <div class="card-footer">
                          <button
                            type="button"
                            class="wattsapp btn btn-success px-2"
                            style={{
                              margintop: "25px",
                              marginleft: "1px",
                            }}
                          >
                            Join Wattsapp Group
                          </button>
                        </div>

                        <div class="card-footer ">
                          <h3 class="card-text font-medium-1">
                            Visit Our Tech Blogging Website
                          </h3>
                          <div class="d-flex">
                            <p
                              class=" tags mb-75 mt-2 pt-50 "
                              style={{
                                marginleft: "3px",
                                marginright: "3px",
                                textdecoration: "underline",
                              }}
                            >
                              <a href="">Eziblogs</a>
                            </p>
                            <p
                              class=" tags mb-75 mt-2 pt-50 "
                              style={{
                                marginleft: "3px",
                                marginright: "3px",
                                textdecoration: "underline",
                              }}
                            >
                              <a href="">|</a>
                            </p>
                            <p
                              class=" tags mb-75 mt-2 pt-50"
                              style={{
                                marginleft: "3px",
                                marginright: "3px",
                                textdecoration: "underline",
                              }}
                            >
                              <a href=""> Ezicoding</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ......................charts................ */}
                <div class="row">
                  <div class="col-lg-8">
                    <div
                      className="tracker"
                      style={{
                        marginleft: "-14px",
                      }}
                    >
                      <div class="col-lg-9  col-12">
                        <div class="card">
                          <div class="card-header d-flex justify-content-between pb-0">
                            <h2 class="card-title font-weight-bolder font-large-1">
                              Project Tracker
                            </h2>
                            <div class="dropdown chart-dropdown"></div>
                          </div>
                          <div class="card-body">
                            <div class="column">
                              <div class="col-sm-2 col-12 d-flex flex-column flex-wrap text-center">
                                <h1 class="font-large-2 font-weight-bolder mt-2 mb-0">
                                  0
                                </h1>
                                <h5>
                                  {" "}
                                  <span>Total Projects</span>{" "}
                                </h5>
                              </div>

                              {/* icon 1 */}
                              <div class="d-flex mt-2 ml-2">
                                <div class="icon mr-2 mt-1">
                                  <i
                                    class=" icon1 px-1 mr-1"
                                    style={{
                                      color: "#776cf0",
                                      backgroundcolor: "#eae8fd",
                                      padding: "11px 5px",
                                      borderradius: "10px",
                                    }}
                                  >
                                    <i data-feather="folder-plus"></i>
                                  </i>
                                </div>
                                <div class="">
                                  <h5 class=" font-weight-bolder">
                                    Total Tasks
                                  </h5>
                                  <p>0</p>
                                </div>
                              </div>
                              {/* icon 2 */}
                              <div class="d-flex mt-2 ml-2">
                                <div class="icon mr-2 mt-1">
                                  <i
                                    class=" icon2 px-1 mr-1"
                                    style={{
                                      color: "#ffa146",
                                      backgroundcolor: "#fff1e3",
                                      padding: "11px 5px",
                                      borderradius: "10px",
                                    }}
                                  >
                                    <i data-feather="loader"></i>
                                  </i>
                                </div>
                                <div class="">
                                  <h5 class=" font-weight-bolder">
                                    In Progress
                                  </h5>
                                  <p>0</p>
                                </div>
                              </div>
                              {/* icon 3 */}
                              <div class="d-flex mt-2 ml-2 mb-2">
                                <div class="icon mr-2 mt-1">
                                  <i
                                    class=" icon3 px-1 mr-1"
                                    style={{
                                      color: "ec6566",
                                      backgroundcolor: "#fce5e6",
                                      padding: "11px 5px",
                                      borderradius: "10px",
                                    }}
                                  >
                                    <i data-feather="menu"></i>
                                  </i>
                                </div>
                                <div class="">
                                  <h5 class=" font-weight-bolder">
                                    Completed Tasks
                                  </h5>
                                  <p>0</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* .............leadership.............. */}
                  <div class="col-lg-4">
                    <section id="row-grouping-datatable">
                      <div class="row">
                        <div class="col-12">
                          <div class="card">
                            <div class="card-header border-bottom">
                              <h4 class="card-title">Leadersboards</h4>
                            </div>
                            <div class="card-datatable">
                              <table class="dt-row-grouping table">
                                <thead>
                                  <tr
                                    style={{
                                      height: "40px",
                                    }}
                                  >
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>

                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>

                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>

                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--/end  leadership --> */}
                  </div>
                </div>

                {/* ........................counter ....................*/}

                {/* <div class=" couuu col-lg-12 col-12" style={{
                boxShadow: "0px 4px  #fce5e6",
                textAlign: "center",
                justifyContent: "center",
              
              }}>
                <div class="card card-statistics">

                  <div class="card-body statistics-body">
                    <div class="row">
                      <div class="col-md-3 col-sm-6 col-12 mb-2 mb-md-0">
                        <div class="media" style={{
                          paddingLeft: "0px"
                        }}>
                          <div class="avatar bg-light-primary ">

                          </div>
                          <div class="media-body my-auto">
                           
                            <div class=" counter1 card-header align-items-center" >
                              <div className='count1'>
                               
                                <div class="d-flex ml-2">
                                  <h1 className="count" data-count="8401">0</h1>
                                  <h1 style={{
                                    margintop: "25px",
                                    marginbottom: "10px"
                                  }}>+</h1>
                                </div>
                                <p class="" style={{ fontweight: "700" }}>Total Enternies</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                  
                      <div class="col-md-3 col-sm-6 col-12 mb-2 mb-md-0">
                        <div class="media">
                          <div class="avatar bg-light-primary mr-2">

                          </div>
                          <div class="media-body my-auto">
                            <div class=" counter2 card-header align-items-center">
                              <div className='count1'>
                              
                                <div class="d-flex ml-2">
                                  <h1 className="count" data-count="8401" >0</h1>
                                  <h1 style={{
                                    margintop: "25px",
                                    marginbottom: "10px"
                                  }}>+</h1>
                                </div>
                                <p class="" style={{ fontweight: "700" }}>Certified Enternies</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    
                      <div class="col-md-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div class="media">
                          <div class="avatar bg-light-primary mr-2">

                          </div>
                          <div class="media-body my-auto">
                            <div class=" counter3 card-header align-items-center">
                              <div className='count1'>
                              
                                <div class="d-flex ml-2">
                                  <h1 className="count" data-count="8401">0</h1>
                                  <h1 style={{
                                    margintop: "25px",
                                    marginbottom: "10px"
                                  }}>+</h1>
                                </div>
                                <p class="" style={{ fontweight: "700" }}>Real Professionals</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      
                      <div class="col-md-3 col-sm-6 col-12">
                        <div class="media">
                          <div class="avatar bg-light-primary mr-2">
                          </div>
                          <div class="media-body my-auto">
                            <div class=" counter4 card-header align-items-center">
                              <div className='count1'>
                              
                                <div class="d-flex ml-2">
                                  <h1 className="count" data-count="8401">0</h1>
                                  <h1 style={{
                                    margintop: "25px",
                                    marginbottom: "10px"
                                  }}>+</h1>
                                </div>
                                <p class="" style={{ fontweight: "700" }}>Total Projects</p>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

 */}
                {/* <Logos/> */}
                <div className="logo_heading" style={{}}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    Our Interns Around The Globe
                  </h1>
                </div>

                <marquee>
                  <div class="row col-lg-12 col-md-12 col-12 ">
                    <div class="align-items-center d-flex">
                      <div class="logo1">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                          }}
                          src={logo11}
                        ></img>
                      </div>

                      <div class="logo2 ">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                            paddingTop: "15px",
                          }}
                          src={logo12}
                        ></img>
                      </div>

                      <div class="logo3">
                        <img
                          style={{
                            height: "140px",
                            marginright: "55px",
                          }}
                          src={logo13}
                        ></img>
                      </div>

                      <div class="logo4 ">
                        <img
                          style={{
                            height: "150px",
                            width: "160px",
                            marginright: "55px",
                          }}
                          src={logo14}
                        ></img>
                      </div>

                      <div class="logo5">
                        <img
                          style={{
                            height: "140px",
                            marginright: "65px",
                          }}
                          src={logo15}
                        ></img>
                      </div>

                      <div class="logo1">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                          }}
                          src={logo16}
                        ></img>
                      </div>

                      <div class="logo2 ">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                          }}
                          src={logo17}
                        ></img>
                      </div>

                      <div class="logo3">
                        <img
                          style={{
                            height: "140px",
                            marginright: "55px",
                          }}
                          src={logo18}
                        ></img>
                      </div>

                      <div class="logo1">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                          }}
                          src={logo19}
                        ></img>
                      </div>

                      <div class="logo2 ">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                          }}
                          src={logo20}
                        ></img>
                      </div>

                      <div class="logo3">
                        <img
                          style={{
                            height: "140px",
                            marginright: "55px",
                          }}
                          src={logo21}
                        ></img>
                      </div>

                      <div class="logo2 ">
                        <img
                          style={{
                            height: "150px",
                            marginright: "55px",
                          }}
                          src={logo22}
                        ></img>
                      </div>

                      <div class="logo3">
                        <img
                          style={{
                            height: "140px",
                            marginright: "55px",
                          }}
                          src={logo23}
                        ></img>
                      </div>
                    </div>
                  </div>
                </marquee>

                {/* ................footer................. */}
              </div>

              <footer
                class="footer footer-static footer-light"
                style={{
                  padding: "0px",
                  margin: "0px",
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
            </section>
          </div>
        </div>
      </div>
    </>

    // <section id="card-demo-example">
    //   <div class="row match-height">
    //     <div class="col-md-6 col-lg-4">
    //       <div class="card">
    //         <img class="card-img-top" src="./app-assets/images/slider/04.jpg" alt="Card image cap" />
    //         <div class="card-body">
    //           <h4 class="card-title">Card title</h4>
    //           <p class="card-text">
    //             Some quick example text to build on the card title and make up the bulk of the card's content.
    //           </p>
    //           <a href="javascript:void(0)" class="btn btn-outline-primary">Go somewhere</a>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </section>
  );
};
