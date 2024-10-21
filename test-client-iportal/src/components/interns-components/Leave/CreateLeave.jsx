import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateLeave = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const name = sessionStorage.getItem("username");
  const tech = sessionStorage.getItem("tech");
  const internType = sessionStorage.getItem("internType");
  const eziId = sessionStorage.getItem("eziId");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const [data, setData] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const CalculateDuration = () => {
      const fromDate = new Date(data.fromDate);
      const toDate = new Date(data.toDate);
      const duration = toDate.getTime() - fromDate.getTime();
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));
      setData({ ...data, durationDays: days });
    };

    CalculateDuration();
  }, [data.fromDate, data.toDate]);

  const SubmitRequest = async () => {
    setData({
      ...data,
      intName: name,
      intTech: tech,
      intType: internType,
      id: eziId,
    });

    if (
      data.toDate !== undefined &&
      data.fromDate !== undefined &&
      data.reason !== undefined
    ) {
      if (
        data.intName !== undefined &&
        data.intTech !== undefined &&
        data.internType !== undefined &&
        data.id !== undefined
      ) {
        await axios
          .post("https://api.ezitech.org/leave-request", { data })
          .then((rs) => {
            alert(res.data.message);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <>
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="leaveRequest"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Leave Request
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
                    <label htmlFor="">From</label>
                    <input
                      type="date"
                      name="fromDate"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">To</label>
                    <input
                      type="date"
                      name="toDate"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Duration</label>
                    <input
                      value={data.durationDays !== NaN ? data.durationDays : ""}
                      type="text"
                      name="duration"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Reason</label>
                    <textarea
                      name="reason"
                      id=""
                      className="form-control"
                      placeholder="Write reason here..."
                      onChange={handleInput}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={SubmitRequest}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
