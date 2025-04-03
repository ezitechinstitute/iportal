import React, { useEffect, useState } from "react";
import { DataSet1 } from "../data/manager-data/Data";
import { ManagerChartOne } from "./ManagerChartOne";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const [interviewCount, setInterviewCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [allInterCount, setAllInternCount] = useState(0);
  const [allActiveCount, setAllActiveCount] = useState(0);
  const [allProjectsCount, setAllProjectsCount] = useState(0);
  const [allTasksCount, setAllTasksCount] = useState(0);

  const [ongoingCount, setOngoingCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [compleCount, setCompleCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  if (!check) {
    navigate("/");
  }

  // const [userData, SetUserData] = useState({
  //   labels: DataSet1.map((rs) => rs.Years),
  //   datasets: [
  //     {
  //       label: "This Year Interns",
  //       data: DataSet1.map((rs) => rs.Visitors),
  //       backgroundColor: ["#3275db"],
  //       borderColor: "#3275db",
  //     },
  //   ],
  // });

  useEffect(() => {
    const InterviewCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-interview-count")
        .then((res) => {
          setInterviewCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    InterviewCount();

    const ContactCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-contact-count")
        .then((res) => {
          setContactCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ContactCount();

    const TestCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-test-count")
        .then((res) => {
          setTestCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    TestCount();

    const TestCompletedCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-completed-count")
        .then((res) => {
          setCompletedCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    TestCompletedCount();

    // Interns Api
    const AllInternCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-all-intern-count")
        .then((res) => {
          setAllInternCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllInternCount();

    const AllActiveCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-all-active-count")
        .then((res) => {
          setAllActiveCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllActiveCount();

    const AllProjectsCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-all-projects-count")
        .then((res) => {
          setAllProjectsCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllProjectsCount();

    const AllTasksCount = async () => {
      await axios
        .get("https://api.ezitech.org/admin-all-tasks-count")
        .then((res) => {
          setAllTasksCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllTasksCount();

    // Projects
    const OngoingCount = async () => {
      await axios
        .get("https://api.ezitech.org/count-ongoing")
        .then((res) => {
          setOngoingCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    OngoingCount();

    const SubmittedCount = async () => {
      await axios
        .get("https://api.ezitech.org/count-submitted")
        .then((res) => {
          setSubmittedCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    SubmittedCount();

    const CompletedCount = async () => {
      await axios
        .get("https://api.ezitech.org/count-completed")
        .then((res) => {
          setCompleCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CompletedCount();

    const ExpiredCount = async () => {
      await axios
        .get("https://api.ezitech.org/count-expired")
        .then((res) => {
          setExpiredCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ExpiredCount();
  }, [2000]);

  const [dataOnsite, setDataOnsite] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Array of labels (e.g., months)
    datasets: [
      {
        label: "Onsite Interns",
        data: [], // Array of data points
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });

  const [dataRemote, setDataRemote] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Array of labels (e.g., months)
    datasets: [
      {
        label: "Remote Interns",
        data: [], // Array of data points
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });

  const GetOnsiteStatics = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/get-statics", {
        headers: { "x-access-token": token },
      });
      const data = res.data;

      setDataOnsite({
        ...dataOnsite,

        datasets: [
          {
            ...dataOnsite.datasets[0],
            data: data.onsite,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GetRemoteStatics = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/get-statics", {
        headers: { "x-access-token": token },
      });
      const data = res.data;

      setDataRemote({
        ...dataRemote,

        datasets: [
          {
            ...dataRemote.datasets[0],
            data: data.remote,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      GetOnsiteStatics();
      GetRemoteStatics();
    }, 1000);
  }, []);

  return (
    <>
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
              <div className="row match-height">
                {/* <!-- Statistics Card --> */}
                <div class="col-12 col-xl-12 col-md-6">
                  <div class="card card-statistics">
                    <div class="card-header">
                      <h4 class="card-title">Manager Statistics</h4>
                      <div class="d-flex align-items-center">
                        <p class="card-text font-small-2 mr-25 mb-0">
                          Updated 1 seconds ago
                        </p>
                      </div>
                    </div>
                    <div class="card-body statistics-body">
                      <div class="row">
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-primary mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="briefcase"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {interviewCount !== 0 ? interviewCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                Interview
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-danger mr-2">
                              <div class="avatar-content">
                                <i data-feather="phone" class="avatar-icon"></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {" "}
                                {contactCount !== 0 ? contactCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">Contact</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div class="media">
                            <div class="avatar bg-light-info mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="clipboard"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {" "}
                                {testCount !== 0 ? testCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">Test</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12">
                          <div class="media">
                            <div class="avatar bg-light-success mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="check-square"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {completedCount !== 0 ? completedCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                Test Completed
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-xl-12 col-md-6">
                  <div class="card card-statistics">
                    <div class="card-header">
                      <h4 class="card-title">Intern Statistics</h4>
                      <div class="d-flex align-items-center">
                        <p class="card-text font-small-2 mr-25 mb-0">
                          Updated 1 seconds ago
                        </p>
                      </div>
                    </div>
                    <div class="card-body statistics-body">
                      <div class="row">
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-primary mr-2">
                              <div class="avatar-content">
                                <i data-feather="users" class="avatar-icon"></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {allInterCount !== 0 ? allInterCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                Total Interns
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-danger mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="loader"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {allActiveCount !== 0 ? allActiveCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                Active Interns
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div class="media">
                            <div class="avatar bg-light-info mr-2">
                              <div class="avatar-content">
                                <i data-feather="grid" class="avatar-icon"></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {allProjectsCount !== 0 ? allProjectsCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                All Projects
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12">
                          <div class="media">
                            <div class="avatar bg-light-success mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="check-square"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {allTasksCount !== 0 ? allTasksCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                All Tasks
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-xl-12 col-md-6">
                  <div class="card card-statistics">
                    <div class="card-header">
                      <h4 class="card-title">Project Statistics</h4>
                      <div class="d-flex align-items-center">
                        <p class="card-text font-small-2 mr-25 mb-0">
                          Updated 1 seconds ago
                        </p>
                      </div>
                    </div>
                    <div class="card-body statistics-body">
                      <div class="row">
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-primary mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="loader"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {ongoingCount !== 0 ? ongoingCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">Ongoing</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-info mr-2">
                              <div class="avatar-content">
                                <i data-feather="check-circle"></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {submittedCount !== 0 ? submittedCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                Submitted
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div class="media">
                            <div class="avatar bg-light-success mr-2">
                              <div class="avatar-content">
                                <i data-feather="check-square"></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {compleCount !== 0 ? compleCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">
                                Completed
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12">
                          <div class="media">
                            <div class="avatar bg-light-danger mr-2">
                              <div class="avatar-content">
                                <i data-feather="x-circle"></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">
                                {expiredCount !== 0 ? expiredCount : 0}
                              </h4>
                              <p class="card-text font-small-3 mb-0">Expired</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* <!-- ChartJS section start --> */}
            <section id="chartjs-chart">
              <div className="row">
                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Onsite Interns</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <ManagerChartOne chartData={dataOnsite} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}

                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Remote Interns</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <ManagerChartOne chartData={dataRemote} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>

            <section id="chartjs-chart">
              <div className="row">
                {/* <!-- Send Message --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Message</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-6 col-12 mt-2">
                          <span>
                            From <input type="date" className="form-control" />
                          </span>
                        </div>
                        <div className="col-xl-6 col-12 mt-2">
                          <span>
                            To <input type="date" className="form-control" />
                          </span>
                        </div>

                        <div className="col-xl-6 col-12 mt-3">
                          <span>
                            Type
                            <select className="form-control" name="" id="">
                              <option value="" disabled selected>
                                --Select--
                              </option>
                              <option value="all">All</option>
                              <option value="test">Test</option>
                              <option value="selective">Selective</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="homebase">Homebase</option>
                              <option value="incomplete">Incomplete</option>
                              <option value="completed">Completed</option>
                            </select>
                          </span>
                        </div>

                        <div className="col-xl-6 col-12 mt-3">
                          <span>
                            Technology
                            <select className="form-control" name="" id="">
                              <option value="" disabled selected>
                                --Select--
                              </option>
                              <option value="all">Web Development</option>
                              <option value="test">MERN Stack</option>
                              <option value="selective">PHP Development</option>
                              <option value="ongoing">Python</option>
                              <option value="homebase">SEO</option>
                              <option value="incomplete">
                                Android Development
                              </option>
                              <option value="completed">Graphic Design</option>
                            </select>
                          </span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mt-3">
                          <span>
                            Message
                            <textarea
                              className="form-control"
                              cols="30"
                              rows="5"
                              placeholder="Hello!"
                            ></textarea>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mt-3">
                          <button className="btn btn-success w-100">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Message End --> */}

                {/* <!--Absentees Table Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Absentees</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <div
                        class="table-responsive"
                        style={{ overflowY: "auto" }}
                      >
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Present</th>
                              <th>Absent</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Angular Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Angular Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Angular Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  React Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Vuejs Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Bootstrap Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Bootstrap Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Absentees Table End --> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
