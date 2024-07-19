import React, { useEffect, useState } from "react";
import {
  CountActive,
  CountInterview,
  CountTest,
  CountTestCompleted,
} from "../data/manager-data/Data";

export const InternStatics = () => {
  const [interview, setInterview] = useState(0);
  const [test, setTest] = useState(0);
  const [complete, setComplete] = useState(0);
  const [active, setActive] = useState(0);

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

  const GetActive = async () => {
    try {
      const data = await CountActive();
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
      GetActive();
    }, 1000);
  }, []);
  return (
    <>
      <div className="col-12">
        <div className="card card-statistics">
          <div className="card-header">
            <h4 className="card-title">Oniste Interns Statistics</h4>
            <div className="d-flex align-items-center">
              <p className="card-text font-small-2 mr-25 mb-0">
                Updated 1 Second ago
              </p>
            </div>
          </div>
          <div className="card-body statistics-body">
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                <div className="media">
                  <div className="avatar bg-light-primary mr-2">
                    <div className="avatar-content">
                      <i data-feather="users" className="avatar-icon"></i>
                    </div>
                  </div>
                  <div className="media-body my-auto">
                    <h4 className="font-weight-bolder mb-0">
                      {interview.toLocaleString()}
                    </h4>
                    <p className="card-text font-small-3 mb-0">Interns</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                <div className="media">
                  <div className="avatar bg-light-danger mr-2">
                    <div className="avatar-content">
                      <i data-feather="clipboard" className="avatar-icon"></i>
                    </div>
                  </div>
                  <div className="media-body my-auto">
                    <h4 className="font-weight-bolder mb-0">
                      {test.toLocaleString()}
                    </h4>
                    <p className="card-text font-small-3 mb-0">Test</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
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
                      {complete.toLocaleString()}
                    </h4>
                    <p className="card-text font-small-3 mb-0">Completed</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="media">
                  <div className="avatar bg-light-info mr-2">
                    <div className="avatar-content">
                      <i data-feather="user-check" className="avatar-icon"></i>
                    </div>
                  </div>

                  <div className="media-body my-auto">
                    <h4 className="font-weight-bolder mb-0">
                      {active.toLocaleString()}
                    </h4>
                    <p className="card-text font-small-3 mb-0">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
