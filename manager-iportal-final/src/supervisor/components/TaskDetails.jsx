import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";

export const TaskDetails = ({ values }) => {
  const [review, setReview] = useState("");
  const [data, setData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const website = {
    title: "Example Site",
    screenshot: "https://via.placeholder.com/800x400.png?text=Website+Screenshot",
    liveLink: "https://www.example.com",
  };

  const GetSubmittedTask = async () => {
    if (!values.taskId || hasFetched) return;
    
    try {
      const res = await axios.get(`https://api.ezitech.org/get-submit-task/${values.taskId}`);
      setData(res.data);
      setHasFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetSubmittedTask();
  }, [values.taskId]);

  useEffect(() => {
    const modal = document.getElementById('xlarge');
    const handleModalClose = () => {
      setHasFetched(false);
    };

    modal.addEventListener('hidden.bs.modal', handleModalClose);
    
    return () => {
      modal.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.points !== undefined && review.desc !== undefined) {
      try {
        const res = await axios.put(`https://api.ezitech.org/submit-review/${values.taskId}`, {
          review,
        });
        alert(res.data.msg);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill empty fields first!!!");
    }
  };

  const ApprovedTask = async () => {
    try {
      const res = await axios.put(`https://api.ezitech.org/approve-task/${values.taskId}`);
      alert(res.data.msg);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const RejectTask = async () => {
    try {
      const res = await axios.put(`https://api.ezitech.org/reject-task/${values.taskId}`);
      alert(res.data.msg);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="modal fade text-left"
      id="xlarge"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel16"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel16">
              Task Details
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
            <div className="container my-5">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((rs) => (
                  <React.Fragment key={rs.task_id}>
                    <div className="card">
                      <img
                        src={rs.task_screenshot}
                        className="card-img-top full-page-screenshot"
                        alt="Website Screenshot"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{rs.task_title}</h5>
                        <div>
                          <h6>Description:</h6>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: rs.submit_description,
                            }}
                          ></div>
                        </div>
                        <a
                          href={rs.task_live_url}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Live Site
                        </a>
                        <a
                          href={rs.task_git_url}
                          className="btn btn-secondary ml-1"
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub Repo
                        </a>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label htmlFor="points">Total Points</label>
                          <input
                            type="number"
                            id="points"
                            className="form-control"
                            value={rs.task_points}
                            min="0"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="points">Assign Points</label>
                          <input
                            type="number"
                            name="points"
                            className="form-control"
                            onChange={handleReviewChange}
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="review">Write Review</label>
                        <textarea
                          name="desc"
                          className="form-control"
                          rows="3"
                          onChange={handleReviewChange}
                        ></textarea>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-3">
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </React.Fragment>
                ))
              ) : (
                <div className="card">
                  <img
                    src={website.screenshot}
                    className="card-img-top full-page-screenshot"
                    alt="Website Screenshot"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{website.title}</h5>
                    <div>
                      <h6>Description:</h6>
                    </div>
                    <a
                      href={website.liveLink}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Live Site
                    </a>
                    <a
                      href={website.liveLink}
                      className="btn btn-secondary ml-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={RejectTask}
            >
              Reject
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={ApprovedTask}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};