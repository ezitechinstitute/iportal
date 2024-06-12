import React, { useEffect, useState } from "react";
import { TopHeader } from "../components/TopHeader";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ManagerBalance = () => {
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

  const GetManagerAmount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/get-manager-amount/${managerEmail}`
      );
      console.log(res.data[0].balance);
      setAmount(res.data[0].balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetManagerAmount();
  }, [GetManagerAmount]);

  return (
    <>
      <div class="wrapper">
        <Sidebar />
        <div class="main">
          <TopHeader role={"Manager"} />

          <main class="content px-3 py-2">
            <div class="container-fluid">
              <div
                class="mt-4 mb-5"
                // style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
                aria-label="breadcrumb"
              >
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </div>
              <div class="card border-0 shadow">
                <div class="card-header">
                  <div class="card-title">
                    Latest Updates of {months[localDate.getMonth()]}
                  </div>

                  <div class="card-body">
                    <div className="row">
                      <div className="col-sm-12 shadow rounded p-3">
                        <h5>Your Amount of {months[localDate.getMonth()]}</h5>
                        <br />
                        <h3>PKR-{amount.toLocaleString()}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
