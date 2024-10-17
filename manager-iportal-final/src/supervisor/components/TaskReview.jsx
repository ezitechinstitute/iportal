import React, { useState } from "react";

export const TaskReview = () => {
  const [points, setPoints] = useState(initialPoints);
  const [review, setReview] = useState("");

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handlePointsChange = (e) => {
    setPoints(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic (e.g., send to server)
    alert(`Review Submitted!\nPoints: ${points}\nReview: ${review}`);
  };

  return (
    <div className="container my-5">
      <div className="card">
        <img
          src={website.screenshot}
          className="card-img-top full-page-screenshot"
          alt="Website Screenshot"
        />
        <div className="card-body">
          <h5 className="card-title">{website.title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={website.liveLink}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            View Live Site
          </a>
          <a
            href={repo}
            className="btn btn-secondary ml-2"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="points">Assign Points</label>
          <input
            type="number"
            id="points"
            className="form-control"
            value={points}
            onChange={handlePointsChange}
            min="0"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="review">Write Review</label>
          <textarea
            id="review"
            className="form-control"
            rows="3"
            value={review}
            onChange={handleReviewChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Submit Review
        </button>
      </form>
    </div>
  );
};
