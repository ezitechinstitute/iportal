import axios from "axios";
import React, { useEffect, useState } from "react";

export const AttendanceReport = ({ values }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [countAttend, setCountAttend] = useState(0);
  const [countDuration, setCountDuration] = useState(0);

  useEffect(() => {
    // Convert join date string into a Date object
    const joinDate = new Date(values.join);

    // Ensure the join date is valid
    if (isNaN(joinDate)) {
      console.error("Invalid join date");
      return;
    }

    // Calculate the end date by adding the number of months to the join date
    const endDate = new Date(joinDate);
    endDate.setMonth(endDate.getMonth() + values.duration);

    // Calculate the difference in time (milliseconds)
    const timeDifference = endDate.getTime() - joinDate.getTime();

    // Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    setCountDuration(daysDifference);
  }, [values.join, values.duration]);

  const GetAttendance = async () => {
    await axios
      .get(`http://localhost:8800/count-attend/${values.intEmail}`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log(res.data);
        setCountAttend(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAttendance();
  }, [GetAttendance]);

  return (
    <div className="basic-modal">
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="default"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel1">
                Attendance
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
                      {countAttend}/{countDuration}
                    </h2>
                    <h3>Presenst</h3>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card shadow rounded p-3 text-center">
                    <h2 style={{ color: "red" }}>10/{countDuration}</h2>
                    <h3>Absent</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
