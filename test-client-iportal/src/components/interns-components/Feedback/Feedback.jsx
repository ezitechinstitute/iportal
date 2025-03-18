import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import "./Feedback.css";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { FiMessageSquare } from "react-icons/fi";

const Feedback = () => {
  // State to store the feedback input
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const currentYear = new Date().getFullYear();

  // Handle feedback change
  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show alert when the submit button is clicked
    alert("Thank you for submitting your feedback!");

    if (!feedback) return;

    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("eziId");

    if (!token || !id) {
      setError('User is not authenticated.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.ezitech.org/intern-feedback?id=' + id,
        { feedback_text: feedback },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setFeedback(''); // Reset the feedback field
        // alert("Your feedback has been submitted successfully!"); // Show success alert
        // Hide the success message after 2 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        setError(`Error: ${err.response.data.message || 'Please try again.'}`);
      } else {
        setError('Error submitting feedback. Please try again.');
      }
      alert("Failed to submit feedback. Please try again."); // Show error alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body mt-3">
            <section className="basic-textarea">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header py-1">
                      <i
                        style={{
                          marginRight: "10px",
                          marginTop: "3px",
                          flexShrink: 0, // Prevents icon from shrinking if the title gets too long
                        }}
                        className="ficon"
                        data-feather="message-square"
                      ></i>
                      <h1 className="card-title"><FiMessageSquare size={27} /> Feedback</h1>
                    </div>
                    {success && (
                        <div className="ml-5 text-success">
                          Feedback submitted successfully!
                        </div>
                      )}
                      {error && <div className="mt-2 text-danger">{error}</div>}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group ml-2">
                           
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="6"
                                placeholder="Your broken piece of words are very valuable for us"
                                value={feedback}
                                onChange={handleChange}
                              ></textarea>
                          
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary ml-2"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit'}
                      </button>
                     
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="footer footer-static footer-light" style={{ padding: "0px", margin: "0px", marginTop: "175px" }}>
          <div></div>
          <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
            <span className="mt-25">COPYRIGHT &copy; 2016-{currentYear}<a className="ml-25" href="https://ezitech.org/html-css-internship-opportunities/" target="_blank">Ezitech Institute</a><span className="d-none d-sm-inline-block">, All rights Reserved</span></span>
            <span className="float-md-right d-none d-md-block">
              <a href="https://www.facebook.com/" style={{ color: "#75727f" }}><i className="mr-1" data-feather='facebook' style={{ color: "#5E5873" }}></i></a>
              <a href="https://www.instagram.com/"><i className="mr-1" data-feather='instagram' style={{ color: "#75727f", marginLeft: "15px" }}></i></a>
              <a href="https://www.linkedin.com/"><i className="mr-1" data-feather='linkedin' style={{ color: "#75727f", marginLeft: "15px" }}></i></a>
              <a href="https://twitter.com/i/flow/login"><i className="mr-1" data-feather='youtube' style={{ color: "#75727f", marginLeft: "15px" }}></i></a>
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Feedback;