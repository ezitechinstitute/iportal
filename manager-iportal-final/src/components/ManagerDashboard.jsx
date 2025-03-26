import React, { useEffect, useState } from "react";
import { ManagerChartOne } from "./ManagerChartOne";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import { ManagerChartTwo } from "./ManagerChartTwo";
import { InternStaticsDashboard } from "./InternStaticsDashboard";

export const ManagerDashboard = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [amount, setAmount] = useState(0);
  const localDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const managerEmail = sessionStorage.getItem("email");
  const username = sessionStorage.getItem("username");

  // Fetch manager's balance
  const GetManagerAmount = async () => {
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-manager-amount/${managerEmail}`,
        { headers: { "x-access-token": token } }
      );
      setAmount(res.data[0].balance);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch chart data for onsite and remote interns
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
    ],
    datasets: [
      {
        label: "Onsite Interns",
        data: [],
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
    ],
    datasets: [
      {
        label: "Remote Interns",
        data: [],
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });

  // Fetch chart data from the API
  const GetChartData = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/get-statics", {
        headers: { "x-access-token": token },
      });
      const { onsite, remote } = res.data;
  
      setDataOnsite({
        ...dataOnsite,
        datasets: [
          {
            ...dataOnsite.datasets[0],
            data: onsite,
          },
        ],
      });
  
      setDataRemote({
        ...dataRemote,
        datasets: [
          {
            ...dataRemote.datasets[0],
            data: remote,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    GetManagerAmount();
    GetChartData();
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
                {/* <div className="card-body">
                  <h3 className="roboto">Dashboard Statistics</h3>
                </div> */}
              </div>
              <div className="row match-height">
                {/* <!-- Medal Card --> */}
                <div className="col-xl-4 col-md-6 col-12">
                  <div className="card card-congratulation-medal p-1">
                    <div className="card-body">
                      <h5>Congratulations 🎉 {username} !</h5>
                      <p className="card-text font-small-3">
                        You have earned in {months[localDate.getMonth()]}
                      </p>
                      <h3 className="mb-75 pt-70">
                        <a href="javascript:void(0);">
                          PKR : {amount.toLocaleString()}
                        </a>
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
                {/* <!--/ Medal Card --> */}

                {/* <!-- Statistics Card --> */}
                <InternStaticsDashboard />
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
                      <ManagerChartTwo chartData={dataRemote} />
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