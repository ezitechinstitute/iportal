import React, { useEffect, useState } from "react";
import {
  CountContactWith,
  CountInterview,
  CountTest,
  CountTestCompleted,
} from "../data/manager-data/Data";
import { Link } from "react-router-dom";

export const InternStatics = () => {
  const [interview, setInterview] = useState(0);
  const [test, setTest] = useState(0);
  const [complete, setComplete] = useState(0);
  const [active, setActive] = useState(0);
  const managerEmail = sessionStorage.getItem("email");

  const GetInterview = async () => {
    try {
      const data = await CountInterview();
      setInterview(data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTestIntern = async () => {
    try {
      const data = await CountTest();
      setTest(data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTestComplete = async () => {
    try {
      const data = await CountTestCompleted();
      setComplete(data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetContactWith = async () => {
    try {
      const data = await CountContactWith();
      setActive(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      GetInterview();
      GetTestIntern();
      GetTestComplete();
      GetContactWith();
    }, 1000);
  }, []);
  return (
    <>
      <div className="col-12">
        <div className="card card-statistics">
          <div className="card-header">
            <h4 className="card-title">Statistics</h4>
            <div className="d-flex align-items-center">
              <p className="card-text font-small-2 mr-25 mb-0">
                Updated 1 Second ago
              </p>
            </div>
          </div>
          <div className="card-body statistics-body">
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                {managerEmail === "muzammil@ezitech.org" ? (
                  <Link to={"/onsite-interns"}>
                    <div className="media">
                      <div className="avatar bg-light-primary mr-2">
                        <div className="avatar-content">
                          <i data-feather="users" className="avatar-icon"></i>
                        </div>
                      </div>
                      <div className="media-body my-auto">
                        <h4 className="font-weight-bolder mb-0">
                          {interview > 0 ? interview.toLocaleString() : "0"}
                        </h4>
                        <p
                          className="card-text font-small-3 mb-0"
                          style={{ color: "black" }}
                        >
                          Interview
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link to={"/remote-interns"}>
                    <div className="media">
                      <div className="avatar bg-light-primary mr-2">
                        <div className="avatar-content">
                          <i data-feather="users" className="avatar-icon"></i>
                        </div>
                      </div>
                      <div className="media-body my-auto">
                        <h4 className="font-weight-bolder mb-0">
                          {interview > 0 ? interview.toLocaleString() : "0"}
                        </h4>
                        <p
                          className="card-text font-small-3 mb-0"
                          style={{ color: "black" }}
                        >
                          Interview
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <Link to={"/contact-with"}>
                  <div className="media">
                    <div className="avatar bg-light-info mr-2">
                      <div className="avatar-content">
                        <i data-feather="phone" className="avatar-icon"></i>
                      </div>
                    </div>

                    <div className="media-body my-auto">
                      <h4 className="font-weight-bolder mb-0">
                        {active > 0 ? active.toLocaleString() : "0"}
                      </h4>
                      <p
                        className="card-text font-small-3 mb-0"
                        style={{ color: "black" }}
                      >
                        Contact
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                <Link to={"/interview-test"}>
                  <div className="media">
                    <div className="avatar bg-light-danger mr-2">
                      <div className="avatar-content">
                        <i data-feather="clipboard" className="avatar-icon"></i>
                      </div>
                    </div>
                    <div className="media-body my-auto">
                      <h4 className="font-weight-bolder mb-0">
                        {test > 0 ? test.toLocaleString() : "0"}
                      </h4>
                      <p
                        className="card-text font-small-3 mb-0"
                        style={{ color: "black" }}
                      >
                        Test
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                <Link to={"/test-completed"}>
                  <div className="media">
                    <div className="avatar bg-light-success mr-2">
                      <div className="avatar-content">
                        <i
                          data-feather="check-square"
                          className="avatar-icon"
                        ></i>
                      </div>
                    </div>
                    <div className="media-body my-auto">
                      <h4 className="font-weight-bolder mb-0">
                        {complete > 0 ? complete.toLocaleString() : "0"}
                      </h4>
                      <p
                        className="card-text font-small-3 mb-0"
                        style={{ color: "black" }}
                      >
                        Completed
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
