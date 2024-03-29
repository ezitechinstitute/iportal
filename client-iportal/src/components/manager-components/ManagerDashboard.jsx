import React, { useState } from "react";
import { DataSet1 } from "../../data/manager-data/Data";
import { ManagerChartOne } from "./ManagerChartOne";
import { FiRefreshCw } from "react-icons/fi";

export const ManagerDashboard = () => {
  const [userData, SetUserData] = useState({
    labels: DataSet1.map((rs) => rs.Years),
    datasets: [
      {
        label: "This Year Interns",
        data: DataSet1.map((rs) => rs.Visitors),
        backgroundColor: ["#988ff4"],
        borderColor: "#988ff4",
      },
    ],
  });
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
                {/* <!-- Medal Card --> */}

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i data-feather="users" style={{ color: "#988ff4" }}></i>
                      <h3 className="roboto mb-75 mt-2 pt-10">9</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Total Interns</h5>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i
                        data-feather="clipboard"
                        style={{ color: "#988ff4" }}
                      ></i>
                      <h3 className="roboto mb-75 mt-2 pt-10">7</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Test</h5>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      {/* <FiRefreshCw style={{ color: "#988ff4" }} /> */}
                      <h3 className="roboto mb-75 mt-2 pt-50">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">In Progress</h5>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center">
                      {/* <img src="./images/ok.gif" alt="" /> */}
                      <h3 className="roboto mb-75 mt-2 pt-50">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">Completed</h5>
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
                      <ManagerChartOne chartData={userData} />
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
                      <ManagerChartOne chartData={userData} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>

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
                      <ManagerChartOne chartData={userData} />
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
                      <ManagerChartOne chartData={userData} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
