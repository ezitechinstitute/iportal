import axios from "axios";
import React, { useState } from "react";

export const AssignShift = ({ values }) => {
  console.log(values);
  const [shift, setShift] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;

    setShift({ ...shift, [name]: value });
  };

  const SubmitShift = async () => {
    setShift({ ...shift, internId: values.etiId, internEmail: values.email });

    if (
      shift.shiftType !== undefined &&
      shift.startShift !== undefined &&
      shift.endShift !== undefined
    ) {
      if (shift.internEmail !== undefined && shift.internId !== undefined) {
        await axios
          .post("https://api.ezitech.org/assign-shift", { shift })
          .then((res) => {
            alert(res.data.msg);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Click again on Assign Shift to confirm");
      }
    } else {
      alert("Please fill empty fields first!!!");
    }
  };

  const UpdateShift = async () => {
    setShift({ ...shift, internId: values.etiId, internEmail: values.email });

    if (
      shift.shiftType !== undefined &&
      shift.startShift !== undefined &&
      shift.endShift !== undefined
    ) {
      if (shift.internId !== undefined && shift.internEmail !== undefined) {
        await axios
          .put(`https://api.ezitech.org/update-shift/${shift.internEmail}`, {
            shift,
          })
          .then((res) => {
            alert(res.data.msg);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Click again on Update Shift to confirm");
      }
    } else {
      alert("Please fill empty fields first!!!");
    }
  };
  return (
    <>
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="shiftModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Assign Shift
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
                  <div className="col-sm-12">
                    <label htmlFor="">Shift Mode</label>
                    <select
                      className="form-control"
                      name="shiftType"
                      id=""
                      onChange={handleInput}
                    >
                      <option selected disabled>
                        --Select--
                      </option>
                      <option value="Onsite">Onsite</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Start Time</label>
                    <input
                      type="time"
                      name="startShift"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">End Shift</label>
                    <input
                      type="time"
                      name="endShift"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={UpdateShift}
                >
                  Update Shift
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={SubmitShift}
                >
                  Assign Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
