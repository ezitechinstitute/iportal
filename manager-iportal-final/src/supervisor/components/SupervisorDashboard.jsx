import React, { useState, useEffect } from "react";
import { DataSet1 } from "../data/manager-data/Data";
import { SupervisorChartOne } from "./SupervisorChartOne";
import { FiRefreshCw, FiUsers, FiClipboard, FiLoader, FiCheckSquare, FiX } from "react-icons/fi";
import axios from "axios";

export const SupervisorDashboard = () => {
  const username = sessionStorage.getItem("username");
  const managerid = sessionStorage.getItem("managerid");
  const [stats, setStats] = useState({
    active: 0,
    test: 0,
    progress: 0,
    completed: 0,
   certificateRequests: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userData] = useState({
    labels: DataSet1.map((rs) => rs.Years),
    datasets: [
      {
        label: "This Year Interns",
        data: DataSet1.map((rs) => rs.Visitors),
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const baseUrl = "https://api.ezitech.org";
      
      const [activeRes, testRes, progressRes, completedRes, certificateRes] = await Promise.all([
        axios.get(`${baseUrl}/active-interns/${managerid}`),
        axios.get(`${baseUrl}/test-interns/${managerid}`),
        axios.get(`${baseUrl}/progress-interns/${managerid}`),
        axios.get(`${baseUrl}/completed-interns/${managerid}`),
        axios.get(`${baseUrl}/get-certificate-requests`)
      ]);

      setStats({
        active: activeRes.data.active_interns_count || 0,
        test: testRes.data.test_interns_count || 0,
        progress: progressRes.data.progress_interns_count || 0,
        completed: completedRes.data.completed_interns_count || 0,
        certificateRequests: certificateRes.data.requests || []
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (managerid) {
      fetchStats();
    }
  }, [managerid]);

  const refreshStats = () => {
    setError(null);
    fetchStats();
  };

  const [chartData, setChartData] = useState({
    onsite: {
        labels: [],
        datasets: [{
            label: 'Onsite Interns',
            data: [],
            backgroundColor: '#3275db',
            borderColor: '#3275db'
        }]
    },
    remote: {
        labels: [],
        datasets: [{
            label: 'Remote Interns',
            data: [],
            backgroundColor: '#6c757d',
            borderColor: '#6c757d'
        }]
    }
});

// Add this to your fetchStats function
const fetchChartData = async () => {
  const baseUrl = "https://api.ezitech.org";
    try {
        const [onsiteRes, remoteRes] = await Promise.all([
            axios.get(`${baseUrl}/onsite-interns/${managerid}`),
            axios.get(`${baseUrl}/remote-interns/${managerid}`)
        ]);

        setChartData({
            onsite: {
                labels: onsiteRes.data.data.labels,
                datasets: [{
                    ...chartData.onsite.datasets[0],
                    data: onsiteRes.data.data.data
                }]
            },
            remote: {
                labels: remoteRes.data.data.labels,
                datasets: [{
                    ...chartData.remote.datasets[0],
                    data: remoteRes.data.data.data
                }]
            }
        });
    } catch (err) {
        console.error("Error fetching chart data:", err);
    }
};

// Call it in your useEffect
useEffect(() => {
    if (managerid) {
        fetchStats();
        fetchChartData();
    }
}, [managerid]);

  if (loading) {
    return (
      <div className="app-content content">
        <div className="content-body">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-content content">
        <div className="content-body">
          <div className="alert alert-danger">
            {error}
            <button className="btn btn-sm btn-primary ml-2" onClick={refreshStats}>
              <FiRefreshCw className="mr-1" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="card card-congratulation-medal rounded-0">
                <div className="card-body">
                  <h3 className="roboto">Dashboard Statistics</h3>
                </div>
              </div>
              <div className="row match-height">
                {/* Medal Card */}
                <div className="col-xl-4 col-md-6 col-12">
                  <div className="card card-congratulation-medal p-1">
                    <div className="card-body">
                      <h5>Congratulations 🎉 {username}!</h5>
                      <p className="card-text font-small-3">
                        You have earn in March
                      </p>
                      <h3 className="mb-75 pt-70">
                        <a href="javascript:void(0);">PKR : 3,499</a>
                      </h3>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "20px" }}
                      >
                        Withdraw
                      </button>
                      <img
                        src="./images/coin.svg"
                        className="congratulation-medal"
                        alt="Medal Pic"
                        width={100}
                        style={{ marginTop: "85px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics Card */}
                <div className="col-12 col-xl-8 col-md-6">
                  <div className="card card-statistics">
                    <div className="card-header">
                      <h4 className="card-title">Statistics</h4>
                      <div className="d-flex align-items-center">
                        <p className="card-text font-small-2 mr-25 mb-0">
                          Updated just now
                        </p>
                        <button 
                          className="btn btn-sm btn-outline-primary ml-auto"
                          onClick={refreshStats}
                        >
                          <FiRefreshCw size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="card-body statistics-body">
                      <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div className="media">
                            <div className="avatar bg-light-primary mr-2">
                              <div className="avatar-content">
                                <FiUsers className="avatar-icon" />
                              </div>
                            </div>
                            <div className="media-body my-auto">
                              <h4 className="font-weight-bolder mb-0">{stats.active}</h4>
                              <p className="card-text font-small-3 mb-0">Active Interns</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div className="media">
                            <div className="avatar bg-light-info mr-2">
                              <div className="avatar-content">
                                <FiClipboard className="avatar-icon" />
                              </div>
                            </div>
                            <div className="media-body my-auto">
                              <h4 className="font-weight-bolder mb-0">{stats.test}</h4>
                              <p className="card-text font-small-3 mb-0">Test</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div className="media">
                            <div className="avatar bg-light-danger mr-2">
                              <div className="avatar-content">
                                <FiLoader className="avatar-icon" />
                              </div>
                            </div>
                            <div className="media-body my-auto">
                              <h4 className="font-weight-bolder mb-0">{stats.progress}</h4>
                              <p className="card-text font-small-3 mb-0">
                                Progress
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                          <div className="media">
                            <div className="avatar bg-light-success mr-2">
                              <div className="avatar-content">
                                <FiCheckSquare className="avatar-icon" />
                              </div>
                            </div>
                            <div className="media-body my-auto">
                              <h4 className="font-weight-bolder mb-0">{stats.completed}</h4>
                              <p className="card-text font-small-3 mb-0">
                                Completed
                              </p>
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
                    <SupervisorChartOne chartData={chartData.onsite} />
                   
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
                    <SupervisorChartOne chartData={chartData.remote} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>

            
            <section id="chartjs-chart">
              <div className="row match-height">
                
                {/* <!-- Message End --> */}

                {/* <!--Absentees Table Start --> */}
                <div className="col-xl-12 col-12">
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
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
                {/* <!-- Certificate Requests Start --> */}
                <section id="certificate-requests" className="mt-3">
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">Certificate Requests</h4>
    </div>
    <div className="card-body">
      {loading ? (
        <p>Loading requests...</p>
      ) : certificateRequests.length === 0 ? (
        <p className="text-muted">No certificate requests found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tech</th>
                <th>Projects</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {certificateRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.username}</td>
                  <td>{req.tech}</td>
                  <td>{req.project_count}</td>
                  <td>{req.duration}</td>
                  <td>
                    <span className={`badge badge-${req.status === "supervisor_approved" ? "success" : "warning"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    if(req.status === "supervisor_approved"){
                      <button className="btn btn-secondary btn-sm" disabled>
                        Approved
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</section>

              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};