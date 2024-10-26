import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-quill/dist/quill.bubble.css"; // Bubble theme
import axios from "axios";

export const AssignTask = ({ id }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [value, setValue] = useState("");
  const [task, setTask] = useState({
    durationDays: null,
    description: null,
    etiId: null,
    supId: null,
  });

  const handleChange = (content) => {
    setValue(content);
  };

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

  const AssignTask = async () => {
    setTask({
      ...task,
      description: value,
      etiId: id.idInt,
      supId: id.idMan,
    });

    if (
      task.taskTitle !== undefined &&
      task.startDate !== undefined &&
      task.endDate !== undefined &&
      task.points !== undefined
    ) {
      if (task.description !== null) {
        await axios
          .post(
            "https://api.ezitech.org/assign-task",
            { task },
            {
              headers: { "x-access-token": token },
            }
          )
          .then((res) => {
            alert(res.data.msg);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Are you sure? Click again on Assign Task");
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
          id="taskModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Assign Task
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

                  <div className="col-sm-6">
                    <label htmlFor="">Duration</label>
                    <input
                      value={task.durationDays !== NaN ? task.durationDays : ""}
                      type="text"
                      name="duration"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Points</label>
                    <input
                      type="number"
                      name="points"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Description</label>
                    <br />
                    <ReactQuill
                      value={value}
                      onChange={handleChange}
                      theme="snow" // Snow is a popular Quill theme
                      placeholder="Task description..."
                    />
                    {/* <div>
                        <h3>Preview:</h3>
                        <div dangerouslySetInnerHTML={{ __html: value }}></div>
                      </div> */}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={AssignTask}
                >
                  Assign Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
