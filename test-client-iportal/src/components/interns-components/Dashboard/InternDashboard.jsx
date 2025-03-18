import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import "./InternDashboard.css";
import ApexChart from './ApexChart';
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
import {
  FaFolderPlus,
  FaSpinner,
  FaCheckSquare,
  FaCalendarCheck,
  FaCoffee,
  FaHome,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export const InternDashboard = () => {
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const id = sessionStorage.getItem("eziId");
  const [average, setAverage] = useState(null);
  const [totalProjects, setTotalProjects] = useState(0);
  const [inPorgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [holidays, setHolidays] = useState(0);
  const [leaves, setLeaves] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasksInProgress, setTasksInProgress] = useState(0);
  const [tasksComplete, setTasksComplete] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [topIntern, setTopIntern] = useState(null); // New state for top intern
  const [announcements, setAnnouncements] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setTimeout(() => setShowChart(true), 100);
  }, []);

  if (!checkLoggedIn) {
    navigate("/");
  }

  // Existing fetch functions remain unchanged...

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("https://api.ezitech.org/get-intern-announcement");
      setAnnouncements(response.data.data); // Set the fetched data to state
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const CountProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-proj`, { params: { id } })
      .then((res) => setTotalProjects(res.data))
      .catch((err) => console.log(err));
  };

  const CountProgressProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-prog-proj`, { params: { id } })
      .then((res) => setInProgress(res.data))
      .catch((err) => console.log(err));
  };

  const CountCompletedProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-comp-proj`, { params: { id } })
      .then((res) => setCompleted(res.data))
      .catch((err) => console.log(err));
  };

  const CountAttendance = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-attend`, { params: { id } })
      .then((res) => setAttendance(res.data))
      .catch((err) => console.log(err));
  };

  const CountHolidays = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-holidays`, { params: { id } })
      .then((res) => setHolidays(res.data))
      .catch((err) => console.log(err));
  };

  const CountLeaves = async () => {
    await axios
      .get(`https://api.ezitech.org/count-int-leaves`, { params: { id } })
      .then((res) => setLeaves(res.data))
      .catch((err) => console.log(err));
  };

  const fetchTotalTasks = async () => {
    try {
      const response = await axios.get(`https://api.ezitech.org/count-total-tasks`, { params: { id } });
      setTotalTasks(response.data.totalTasks);
    } catch (error) {
      console.error("Error fetching total tasks:", error);
    }
  };

  const fetchTasksInProgress = async () => {
    try {
      const response = await axios.get(`https://api.ezitech.org/count-tasks-in-progress`, { params: { id } });
      setTasksInProgress(response.data.totalTasksInProgress);
    } catch (error) {
      console.error("Error fetching tasks in progress:", error);
    }
  };

  const fetchTasksComplete = async () => {
    try {
      const response = await axios.get(`https://api.ezitech.org/count-tasks-complete`, { params: { id } });
      setTasksComplete(response.data.totalTasksComplete);
    } catch (error) {
      console.error("Error fetching tasks complete:", error);
    }
  };

  const getInternAverage = async () => {
    try {
      const response = await axios.get(`https://api.ezitech.org/get-int-avg`, { params: { id } });
      setAverage(response.data.final_average);
    } catch (error) {
      console.error("Error fetch avg:", error);
    }
  };

  
  const getTopIntern = async () => {
    try {
      const response = await axios.get(`https://api.ezitech.org/top-intern-by-average`);
      setTopIntern(response.data.top_intern);
    } catch (error) {
      console.error("Error fetching top intern:", error);
    }
  };

  useEffect(() => {
    getInternAverage();
    CountProjects();
    CountProgressProjects();
    CountCompletedProjects();
    CountAttendance();
    CountHolidays();
    CountLeaves();
    fetchTotalTasks();
    fetchTasksInProgress();
    fetchTasksComplete();
    getTopIntern(); 
    fetchAnnouncements();
  }, []);

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
          setTimeout(() => update(), 9);
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
            <section id="dashboard-ecommerce">
              <div className="container-fluid" style={{ marginTop: "-5px" }}>
                {/* Marquee and Cards Section remain unchanged */}
                <div className="row col-lg-12 mt-1/2">
                  <marquee style={{ color: "#f88a1b" }}>
                    <p className="marquee">
                      14th Year Anniversary. <span className="ezi">Ezitech Institute</span> has completed 14 years. 3963
                      have completed their internship. Thanks all for your unconditional support.
                    </p>
                  </marquee>
                </div>

                <div className="row">
                  <div className="col-lg-8 col-12">
                    <div className="row">
                      {/* Card components remain unchanged */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="card1">
                          <div className="card py-2">
                            <div className="d-flex">
                              <div className="icon px-1 mx-1" style={{ color: "#776cf0", backgroundColor: "#eae8fd", borderRadius: "5px", padding: "4px 5px" }}>
                                <FaFolderPlus size={20} />
                              </div>
                              <h3>{totalProjects !== 0 ? totalProjects : 0}</h3>
                            </div>
                            <div className="card-body pl-1 mt-1">
                              <h4 style={{ marginBottom: "5px", width: "max-content" }}>Total Projects</h4>
                              <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>3.5% Total Progress</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Other cards remain unchanged... */}

                      {/* Card 2: In Progress */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="card2">
                          <div className="card py-2">
                            <div className="d-flex">
                              <div className="icon px-1 mx-1" style={{ color: "#ffa146", backgroundColor: "#fff1e3", borderRadius: "5px", padding: "4px 5px" }}>
                                <FaSpinner size={20} />
                              </div>
                              <h3>{inPorgress !== 0 ? inPorgress : 0}</h3>
                            </div>
                            <div className="card-body pl-1 mt-1">
                              <h4 className="" style={{ marginBottom: "5px", width: "max-content" }}>In Progress</h4>
                              <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>3.5% Total Progress</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Completed Projects */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="card3">
                          <div className="card py-2">
                            <div className="d-flex">
                              <div className="icon px-1 mx-1" style={{ color: "#ec6566", backgroundColor: "#fce5e6", borderRadius: "5px", padding: "4px 5px" }}>
                                <FaCheckSquare size={20} />
                              </div>
                              <h3>{completed !== 0 ? completed : 0}</h3>
                            </div>
                            <div className="card-body pl-1 mt-1">
                              <h4 className="" style={{ marginBottom: "5px", width: "max-content" }}>Completed Projects</h4>
                              <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>3.5% Total Progress</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 4: Total Attendance */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="card4">
                          <div className="card py-2">
                            <div className="d-flex">
                              <div className="icon px-1 mx-1" style={{ color: "#29d6eb", backgroundColor: "#d9f8fc", borderRadius: "5px", padding: "4px 5px" }}>
                                <FaCalendarCheck size={20} />
                              </div>
                              <h3>{attendance !== 0 ? attendance : 0}</h3>
                            </div>
                            <div className="card-body pl-1 mt-1">
                              <h4 className="" style={{ marginBottom: "5px", width: "max-content" }}>Total Attendance</h4>
                              <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>0 Last Week</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 5: Holidays */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="card5">
                          <div className="card py-2">
                            <div className="d-flex">
                              <div className="icon px-1 mx-1" style={{ color: "#28c76f", backgroundColor: "#dcf6e8", borderRadius: "5px", padding: "4px 5px" }}>
                                <FaCoffee size={20} />
                              </div>
                              <h3>{holidays !== 0 ? holidays : 0}</h3>
                            </div>
                            <div className="card-body pl-1 mt-1">
                              <h4 className="" style={{ marginBottom: "5px", width: "max-content", marginRight: "4px" }}>Total Holidays</h4>
                              <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>0 Last Week</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 6: Leaves */}
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="card6">
                          <div className="card py-2">
                            <div className="d-flex">
                              <div className="icon px-1 mx-1" style={{ color: "#ff8ac9", backgroundColor: "#fff0f8", borderRadius: "5px", padding: "4px 5px" }}>
                                <FaHome size={20} />
                              </div>
                              <h3>{leaves !== 0 ? leaves : 0}</h3>
                            </div>
                            <div className="card-body pl-1 mt-1">
                              <h4 className="" style={{ marginBottom: "5px", width: "max-content" }}>Total Leaves</h4>
                              <p className="card-text" style={{ display: "flex", paddingBottom: "0%", marginTop: "14px" }}>0 Last Week</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cardd col-lg-4 col-md-6 col-12">
                    <div className="card card-congratulation-meda">
                      <div className="card-body">
                        <h5 className="notes mr-1" style={{ marginLeft: "20px", fontSize: "23px" }}>Read Notes</h5>
                        <div className="card shadow-sm" style={{ maxWidth: '450px', margin: 'auto' }}>
                          <div className="card-body text-center custom-scrollbar" style={{ maxHeight: '250px', overflowY: 'auto', padding: '15px' }}>
                          {announcements && announcements.length > 0 ? (
  announcements.map((announcement) => (
    <div key={announcement.id}>
      <h5 className="mr-1" style={{ marginLeft: "10px" }}>Hi! {announcement.author_name}</h5>
      <div className="announcement-card mb-3 shadow-sm p-2 rounded text-left" style={{ backgroundColor: '#DEDFE4', borderLeft: '5px solid #4A90E2' }}>
        <h5 className="text-dark font-weight-bold">📢 {announcement.title}</h5>
        <p className="text-dark mb-0">
          {announcement.message}
        </p>
      </div>
    </div>
  ))
) : (
  <p>No announcements yet</p>
)}
                          </div>
                        </div>
                        <div className="card-footer mt-0 mb-0">
                          <button type="button" className="btn btn-success px-2" style={{ marginLeft: "1px" }}>
                            <FaWhatsapp size={16} className="mr-1" /> Join WhatsApp Group
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row md-col">
                  <div className="col-lg-8">
                    <div className="tracker" style={{ marginLeft: "-14px" }}>
                      <div className="col-lg-12 col-12">
                        <div className="card">
                          <div className="card-header d-flex justify-content-between pb-0">
                            <div className="title-container">
                              <h2 className="card-title font-weight-bolder font-large-1">Project Tracker</h2>
                            </div>
                            <div className="dropdown chart-dropdown"></div>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="column">
                                <div className="col-sm-2 col-12 d-flex flex-column flex-wrap text-center">
                                  <h1 className="font-large-2 font-weight-bolder mt-2 mb-0">{completed !== 0 ? completed : 0}</h1>
                                  <h4><span>Total Projects</span></h4>
                                </div>
                                <div className="d-flex mt-2 ml-2">
                                  <div className="icon mr-2 mt-1">
                                    <div className="icon1 px-1 mr-1" style={{ color: "#776cf0", backgroundColor: "#eae8fd", padding: "11px 5px", borderRadius: "10px" }}>
                                      <FaFolderPlus size={20} />
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-weight-bolder">Total Tasks</h4>
                                    <p>{totalTasks !== 0 ? totalTasks : 0}</p>
                                  </div>
                                </div>
                                <div className="d-flex mt-2 ml-2">
                                  <div className="icon mr-2 mt-1">
                                    <div className="icon2 px-1 mr-1" style={{ color: "#ffa146", backgroundColor: "#fff1e3", padding: "11px 5px", borderRadius: "10px" }}>
                                      <FaSpinner size={20} />
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-weight-bolder">In Progress</h4>
                                    <p>{tasksInProgress !== 0 ? tasksInProgress : 0}</p>
                                  </div>
                                </div>
                                <div className="d-flex mt-2 ml-2 mb-2">
                                  <div className="icon mr-2 mt-1">
                                    <div className="icon3 px-1 mr-1" style={{ color: "#ec6566", backgroundColor: "#fce5e6", padding: "11px 5px", borderRadius: "10px" }}>
                                      <FaCheckSquare size={20} />
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-weight-bolder">Completed Tasks</h4>
                                    <p>{tasksComplete !== 0 ? tasksComplete : 0}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="chart-container" style={{ width: "70%", marginRight: '15px' }}>
                                {showChart ? <ApexChart /> : <p>Loading...</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modified Leadership Section */}
                  <div className="col-lg-4">
                    <section id="row-grouping-datatable">
                      <div className="row">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-header border-bottom">
                              <h4 className="">Leaderboard - Top Intern</h4>
                            </div>
                            <div className="card-datatable">
                              <table className="dt-row-grouping table">
                                <thead>
                                  <tr style={{ height: "40px" }}>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Technology</th>
                                    <th>Average</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {topIntern ? (
                                    <tr>
                                      <td>
                                        <img
                                          src={topIntern.image}
                                          alt="Top Intern"
                                          style={{ width: "40px", height: "40px", borderRadius: "20%", marginRight: "10px" }}
                                        />

                                      </td>
                                      <td>{topIntern.name}</td>
                                      <td>{topIntern.technology}</td>
                                      <td>{topIntern.average}%</td>
                                    </tr>
                                  ) : (
                                    <tr>
                                      <td colSpan="4">Loading top intern data...</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Logos and Footer Section remain unchanged */}
                <div className="logo_heading">
                  <h1 style={{ textAlign: "center", fontWeight: "700" }}>Our Interns Around The Globe</h1>
                </div>
                <marquee>
                  <div className="row col-lg-12 col-md-12 col-12 ">
                    <div className="align-items-center d-flex">
                      {[logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20, logo21, logo22, logo23].map((logo, index) => (
                        <div key={index} className={`logo${index + 1}`}>
                          <img style={{ height: "150px", marginRight: "55px" }} src={logo} alt={`Logo ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </marquee>
                <footer className="footer footer-static footer-light" style={{ padding: "0px", margin: "0px" }}>
                  <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
                    <span className="mt-25">
                      COPYRIGHT © 2016-{currentYear}
                      <a className="ml-25" href="https://ezitech.org/html-css-internship-opportunities/" target="_blank" rel="noopener noreferrer">
                        Ezitech Institute
                      </a>
                      <span className="d-none d-sm-inline-block">, All rights Reserved</span>
                    </span>
                    <span className="float-md-right d-none d-md-block">
                      <a href="https://www.facebook.com/" style={{ color: "#75727f" }}>
                        <FaFacebookF size={16} className="mr-1" />
                      </a>
                      <a href="https://www.instagram.com/">
                        <FaInstagram size={16} className="mr-1" style={{ marginLeft: "15px" }} />
                      </a>
                      <a href="https://www.linkedin.com/">
                        <FaLinkedin size={16} className="mr-1" style={{ marginLeft: "15px" }} />
                      </a>
                      <a href="https://twitter.com/i/flow/login">
                        <FaYoutube size={16} className="mr-1" style={{ marginLeft: "15px" }} />
                      </a>
                    </span>
                  </p>
                </footer>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};