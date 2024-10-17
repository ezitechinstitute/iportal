import axios from "axios";
import React, { useState, useEffect } from "react";

export const CreateTask = ({ data }) => {
    console.log(data)
  const [task, setTask] = useState({
    durationDays: null,
  });

  const handleInput = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const CalculateDuration = () => {
      const startDate = new Date(task.startDate);
      const endDate = new Date(task.endDate);
      const duration = endDate.getTime() - startDate.getTime();
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));
      setTask({ ...task, durationDays: days });
    };

    CalculateDuration();
  }, [task.startDate, task.endDate]);

  const TaskCreate = async () => {
    setTask({
      ...task,
      id: data.id,
      projectId: data.projectId,
      points: data.points,
    });

    if (
      task.taskTitle !== undefined &&
      task.startDate !== undefined &&
      task.endDate !== undefined
    ) {
      if (
        task.durationDays !== undefined &&
        task.id !== undefined &&
        task.projectId !== undefined &&
        task.points !== undefined
      ) {
        await axios
          .post("http://localhost:8800/create-task", { task })
          .then((res) => {
            alert(res.data.msg);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Are you sure? Click again to create task to confirm");
      }
    } else {
      alert("Please fill empty field first!!!");
    }
  };
  return (
    <>
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="default2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Create Task
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
                    <label htmlFor="">Task Title</label>
                    <input
                      type="text"
                      name="taskTitle"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Duration</label>
                    <input
                      value={task.durationDays !== NaN ? task.durationDays : ""}
                      type="text"
                      name="duration"
                      //   onChange={handleInput}
                      className="form-control"
                    />
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
                  onClick={TaskCreate}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
