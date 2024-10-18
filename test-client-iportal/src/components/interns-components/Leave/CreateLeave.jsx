import React from "react";

export const CreateLeave = () => {
    
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
                    <label htmlFor="">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      //   onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      //   onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Duration</label>
                    <input
                    //   value={task.durationDays !== NaN ? task.durationDays : ""}
                      type="text"
                      name="duration"
                      //   onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Reason</label>
                    <textarea name="reason" id="" className="form-control" placeholder="Write reason here..."></textarea>
                  </div>

                  {/* <div className="col-sm-6">
                    <label htmlFor="">Points</label>
                    <input
                      type="number"
                      name="points"
                    //   onChange={handleInput}
                      className="form-control"
                    />
                  </div> */}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  //   onClick={TaskCreate}
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
