import React, { useState, useEffect } from "react";
import InternTopbar from "./interns-components/InternTopbar/InternTopbar";
import InternSidebar from "./interns-components/InternSidebar";
import axios from "axios";
import { FiAward, FiVideo, FiFileText, FiUploadCloud } from "react-icons/fi";
import ApexChart from "./interns-components/Dashboard/ApexChart";

export const GetCertificate = () => {
  const id = sessionStorage.getItem("eziId");
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const tech = sessionStorage.getItem("tech");
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", username);
      formData.append("email", email);
      formData.append("tech", tech);
      formData.append("video", file);

      const res = await axios.post(
        "http://localhost:8088/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
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
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row match-height mt-2">
                {/* Internship Progress Card */}
                <div className="col-lg-6 col-md-12">
                  <div className="card shadow-sm border-0 text-center">
                    <div className="card-header d-flex align-items-center justify-content-center border-0 bg-transparent">
                      <FiAward
                        size={24}
                        style={{ color: "#6E3AFF" }}
                        className="me-2"
                      />
                      <h4
                        className="card-title mb-0"
                        style={{ color: "#6E3AFF" }}
                      >
                        Internship Progress
                      </h4>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      {loading ? (
                        <p>Loading progress...</p>
                      ) : (
                        <>
                          {/* 🟣 Render your chart component here */}
                          {/* Example: <PerformanceChart /> */}
                          <div
                            className="w-100 d-flex justify-content-center"
                            style={{ maxWidth: "250px" }}
                          >
                            <ApexChart />
                          </div>

                          {/* You can still show % below the chart */}
                          {/* <h5
                            className="mt-3 fw-bold"
                            style={{ color: "#6E3AFF" }}
                          >
                            {average}%
                          </h5> */}
                        </>
                      )}
                      <p className="text-muted small mt-2 mb-0">
                        Minimum 70% progress is required to download your
                        certificate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video Feedback Upload Card */}
                <div className="col-lg-6 col-md-12">
                  <div className="card shadow-sm border-0">
                    <div className="card-header d-flex align-items-center border-0 bg-transparent">
                      <FiVideo
                        size={24}
                        style={{ color: "#6E3AFF" }}
                        className="me-2"
                      />
                      <h4
                        className="card-title mb-0"
                        style={{ color: "#6E3AFF" }}
                      >
                        Video Feedback Submission
                      </h4>
                    </div>
                    <div className="card-body">
                      <p
                        className="fw-bold"
                        style={{ color: "#6E3AFF", fontWeight: "bold" }}
                      >
                        Before downloading your certificate, please record and
                        upload a short video (15–30 seconds) sharing your
                        internship experience at <b>Ezitech Institute</b>.
                      </p>
                      <p className="mb-2 fw-bold">
                        Your video will be reviewed by our manager through the
                        dashboard. Once approved, you’ll be able to download
                        your certificate.
                      </p>

                      <h6
                        className="fw-bold mt-3 mb-2"
                        style={{ color: "#6E3AFF" }}
                      >
                        🎥 Video Quality Guidelines:
                      </h6>
                      <ul className="ps-3">
                        <li>
                          Start by introducing yourself and your internship
                          department.
                        </li>
                        <li>
                          Clearly describe what you learned and your experience
                          at Ezitech.
                        </li>
                        <li>
                          Ensure your <b>voice is clear</b> and{" "}
                          <b>background is neat</b>.
                        </li>
                        <li>
                          Use <b>good lighting</b> and keep the camera stable.
                        </li>
                        <li>
                          Make sure the video length is between{" "}
                          <b>15–30 seconds</b>.
                        </li>
                      </ul>

                      {!videoUploaded ? (
                        <div className="mt-2">
                          <label
                            htmlFor="videoUpload"
                            className="btn text-white"
                            style={{
                              backgroundColor: "#6E3AFF",
                              cursor: "pointer",
                            }}
                          >
                            <FiUploadCloud className="me-1" /> Upload Feedback
                            Video
                          </label>
                          <input
                            id="videoUpload"
                            name="video"
                            type="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleFile}
                          />
                        </div>
                      ) : !approved ? (
                        <p className="mt-2 mb-0 fw-bold text-warning">
                          ⏳ Your video has been submitted. Please wait for
                          manager approval.
                        </p>
                      ) : (
                        <p className="mt-2 mb-0 fw-bold text-success">
                          ✅ Your video has been approved.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certificate Download Card */}
                <div className="col-lg-12">
                  <div className="card text-center shadow-sm border-0">
                    <div className="card-header border-0 bg-transparent d-flex justify-content-center align-items-center">
                      <FiFileText
                        size={24}
                        style={{ color: "#6E3AFF" }}
                        className="me-2"
                      />
                      <h4
                        className="card-title mb-0"
                        style={{ color: "#6E3AFF" }}
                      >
                        Download Your Certificate
                      </h4>
                    </div>
                    <div className="card-body">
                      {average < 70 ? (
                        <p className="fw-bold text-danger">
                          ❌ You cannot download the certificate yet. Please
                          complete at least 70% progress.
                        </p>
                      ) : !videoUploaded ? (
                        <p className="fw-bold text-warning">
                          ⚠️ Please upload your feedback video before
                          downloading your certificate.
                        </p>
                      ) : !approved ? (
                        <p className="fw-bold text-warning">
                          ⏳ Your video is under review. You’ll be able to
                          download your certificate once it’s approved by our
                          manager.
                        </p>
                      ) : (
                        <button
                          className="btn text-white"
                          style={{ backgroundColor: "#6E3AFF" }}
                          onClick={() => alert("Downloading certificate...")}
                        >
                          Download Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
