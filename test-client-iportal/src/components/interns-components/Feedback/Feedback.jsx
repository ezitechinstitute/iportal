import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import "./Feedback.css";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { FiMessageSquare } from "react-icons/fi";
import {Footer} from '../../Footer';
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

<Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;