import axios from "axios";
import React, { useEffect, useState } from "react";

export const ProjectReport = ({ values }) => {
  const [countAllPro, setCountAllPro] = useState(0);
  const [countCompPro, setCountCompPro] = useState(0);
  const [countExpPro, setCountExpPro] = useState(0);

  const CountAllProjects = async () => {
    await axios
      .get(`http://localhost:8800/count-all-proj/${values.intEmail}`)
      .then((res) => {
        setCountAllPro(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountCompletedProjects = async () => {
    await axios
      .get(`http://localhost:8800/count-comp-proj/${values.intEmail}`)
      .then((res) => {
        setCountCompPro(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CountExpireProjects = async () => {
    await axios
      .get(`http://localhost:8800/count-exp-proj/${values.intEmail}`)
      .then((res) => {
        setCountExpPro(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CountAllProjects();
    CountCompletedProjects();
    CountExpireProjects();
  }, [CountAllProjects, CountCompletedProjects, CountExpireProjects]);
  return (
    <>
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="default1"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Projects
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card shadow rounded p-3 text-center">
                      <h2 style={{ color: "limegreen" }}>
                        {countCompPro}/{countAllPro}
                      </h2>
                      <h3>Completed</h3>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="card shadow rounded p-3 text-center">
                      <h2 style={{ color: "red" }}>
                        {countExpPro}/{countAllPro}
                      </h2>
                      <h3>Expired</h3>
                    </div>
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
