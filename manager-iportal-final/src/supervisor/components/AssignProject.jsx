import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-quill/dist/quill.bubble.css"; // Bubble theme
import axios from "axios";

export const AssignProject = ({ id }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [value, setValue] = useState("");
  const [project, setProject] = useState({
    durationDays: null,
    description: null,
    etiId: null,
    supId: null,
  });

  const handleChange = (content) => {
    setValue(content);
  };

  const handleInput = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const CalculateDuration = () => {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
      const duration = endDate.getTime() - startDate.getTime();
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));
      setProject({ ...project, durationDays: days });
    };

    CalculateDuration();
  }, [project.startDate, project.endDate]);

  const AssignProject = async () => {
    setProject({
      ...project,
      description: value,
      etiId: id.idInt,
      supId: id.idMan,
    });

    if (
      project.projectTitle !== undefined &&
      project.startDate !== undefined &&
      project.endDate !== undefined &&
      project.points !== undefined
    ) {
      if (project.description !== null) {
        await axios
          .post(
            "http://localhost:8800/assign-project",
            { project },
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
        alert("Are you sure? Click again on Assign Project");
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
                  Assign Project
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
                    <label htmlFor="">Project Title</label>
                    <input
                      type="text"
                      name="projectTitle"
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
                      value={
                        project.durationDays !== NaN ? project.durationDays : ""
                      }
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
                      placeholder="Project description..."
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
                  onClick={AssignProject}
                >
                  Assign Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
