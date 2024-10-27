import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-quill/dist/quill.bubble.css"; // Bubble theme
import axios from "axios";

export const UploadProjectTask = ({ values }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [value, setValue] = useState("");
  const [task, setTask] = useState({
    description: null,
    etiId: null,
  });

  const handleChange = (content) => {
    setValue(content);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setTask({ ...task, taskImage: reader.result });
    });
  };

  const handleInput = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const SubmitProjectTask = async () => {
    setTask({
      ...task,
      description: value,
      taskId: values.taskId,
    });

    if (task.liveUrl !== undefined && task.repoUrl !== undefined) {
      if (task.description !== null && task.taskImage !== undefined) {
        console.log(task);
        await axios
          .post(
            "https://api.ezitech.org/submit-project-task",
            { task }
            // {
            //   headers: { "x-access-token": token },
            // }
          )
          .then((res) => {
            alert(res.data.msg);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Are you sure? Click again on Submit Task");
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
          id="project-task"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Submit Project Task
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
                    <label htmlFor="">Screen Shot</label>{" "}
                    <input
                      type="file"
                      name="screenShot"
                      onChange={handleImage}
                      className="form-control"
                      accept=".jpg, .jpeg, .png"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <label htmlFor="">Task Title</label>
                    <input
                      type="text"
                      name="taskTitle"
                      value={values.taskTitle}
                      className="form-control"
                      readOnly
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Live URL</label>
                    <input
                      type="url"
                      name="liveUrl"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Github Repo URL</label>
                    <input
                      type="url"
                      name="repoUrl"
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
                  onClick={SubmitProjectTask}
                >
                  Submit Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
