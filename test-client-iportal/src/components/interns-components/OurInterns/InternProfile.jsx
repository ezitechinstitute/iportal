import React, { useState } from "react";
import "./InternAssets/profile.scoped.css";
import { useParams } from "react-router-dom";
import logo from "./InternAssets/ezitech.png";
import interns1 from "./InternAssets/interns1.jpg";
import verifiedEmoji from "./InternAssets/verified_emoji_64.png";
import unverifiedEmoji from "./InternAssets/2026_Unverified.png";
import {
  useGetPublicProfileProjectsQuery,
  useGetPublicProfileQuery,
  useGetPublicProfileScoresQuery,
} from "../../../services/internsApi";

export const InternProfile = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const internId = useParams().internId;
  const {
    data: internData,
    error,
    isLoading,
  } = useGetPublicProfileQuery(internId);

  const {
    data: projectsData,
    error: projectError,
    isLoading: projectLoading,
  } = useGetPublicProfileProjectsQuery(internId);

  const {
    data: scoresData,
    error: scoresDataError,
    isLoading: scoreDataLoading,
  } = useGetPublicProfileScoresQuery(internId);

  return (
    <>
      {isLoading && <h3 className="text-center">Loading...</h3>}
      {error && <h3 className="text-center">Error: {error.message}</h3>}
      {!internData && <h3 className="text-center">No Data Available</h3>}
      <div className="intern-profile">
        <main className="main">
          <header className="topbar">
            <div className="logo">
              <img src={logo} alt="Ezitech Logo" />
            </div>
            {/* <div className="search-box">
              <input type="search" placeholder="Search" />
            </div>
            <div className="top-right">
              <div className="top-user">
                <div className="top-user-text">
                  <div className="top-user-name">Charles Deo</div>
                  <div className="top-user-sub muted">
                    <a href="index.html">Log out</a>
                  </div>
                </div>
                <img className="top-avatar" src="intern3.jpg" alt="user" />
              </div>
            </div> */}
          </header>

          <section className="profile-card">
            <div
              className="cover"
              style={{ backgroundImage: `url(${interns1})` }}
            >
              <div className="cover-overlay"></div>
            </div>

            <div className="profile-strip">
              <div className="avatar">
                <img src={internData?.avatar} alt="avatar" style={{position: "relative"}}/>
              </div>
              <div className="profile-info">
                <h1 className="name">
                  {internData?.name || "Intern Name"}
                  {internData?.int_status === "Completed" ? (
                    <img
                      src={verifiedEmoji}
                      alt="verified"
                      className="verified-icon"
                    />
                  ) : (
                    <img
                      src={unverifiedEmoji}
                      alt="unverified"
                      className="verified-icon"
                    />
                  )}
                </h1>
                <p className="role muted">
                  {internData?.technology || "Technology"}
                </p>
              </div>

              <div className="profile-actions">
                <button className="btn ghost">💬</button>
                <button
                  className="btn outline"
                  // style="background: rgb(49, 112, 174); color: white"
                  style={{ background: "rgb(49, 112, 174)", color: "white" }}
                >
                  Go to Linkdin Profile
                </button>
              </div>
            </div>
          </section>
          <section className="content-grid">
            <aside className="left-col">
              <div className="card about-card">
                <h3>About</h3>
                <ul className="info-list">
                  <li>
                    <i className="fa-solid fa-user icon"></i>{" "}
                    <small>{internData?.gender || "Gender"}</small>
                  </li>
                  <li>
                    <i className="fa-solid fa-cake-candles icon"></i>
                    <small> {internData?.birth_date || "Date of Birth"}</small>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot icon"></i>{" "}
                    <small>
                      {internData?.country || "Location"},{" "}
                      {internData?.city || "City"}
                    </small>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope icon"></i>
                    <small>{internData?.email || "Email Address"}</small>
                  </li>
                  <li>
                    <i className="fa-solid fa-phone icon"></i>{" "}
                    <small>{internData?.phone || "Phone Number"}</small>
                  </li>
                </ul>
              </div>

              <div className="card followers-card">
                <h4>Followers</h4>
                <div className="followers">
                  <img src="intern 2.jpg" alt="" />
                  <img src="intern 3.jpg" alt="" />
                  <img src="intern 2.jpg" alt="" />
                </div>
              </div>
            </aside>

            <main className="center-col">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === "projects" ? "active" : ""}`}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </button>
                <button
                  className={`tab ${
                    activeTab === "performance" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("performance")}
                >
                  Performance
                </button>
              </div>

              {activeTab === "projects" ? (
                <>
                  {projectLoading && (
                    <h3 className="text-center">Loading Projects...</h3>
                  )}
                  {projectError && (
                    <h3 className="text-center">
                      Error: {projectError.message}
                    </h3>
                  )}
                  {projectsData?.length === 0 && (
                    <h3 className="text-center">No Projects Available</h3>
                  )}
                  {projectsData?.map((project) => (
                    <div className="post-card card">
                      <div className="post-header">
                        {/* <img className="post-avatar" src="intern3.jpg" alt="" /> */}
                        <div>
                          <p className="post-text">
                            <strong>{project.title}</strong>
                          </p>
                          <div className="muted small">1m ago</div>
                        </div>
                        <div className="post-more muted">…</div>
                      </div>

                      <div className="post-body">
                        <img
                          className="post-image"
                          src={
                            project.task_screenshot
                              ? project.task_screenshot
                              : "https://via.placeholder.com/600x400?text=No+Image"
                          }
                          alt="project screenshot"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>

                      <div className="post-footer">
                        <div className="engage">
                          <span>
                            <a
                              type="button"
                              className="engage-item"
                              href={project.task_git_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa-brands fa-github"
                                style={{ color: "white", fontSize: "25px" }}
                              ></i>
                              <strong>GitHub</strong>
                            </a>
                          </span>
                          <span>
                            <a
                              type="button"
                              className="engage-item"
                              href={project.task_live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa-solid fa-link"
                                style={{ color: "white", fontSize: "20px" }}
                              ></i>
                              <strong>Live url</strong>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {scoreDataLoading && (
                    <h3 className="text-center">Loading Performance Data...</h3>
                  )}
                  {scoresDataError && (
                    <h3 className="text-center">
                      Error: {scoresDataError.message}
                    </h3>
                  )}

                  {scoresData && (
                    <div className="performance-section card">
                      <h3>Performance Summary</h3>
                      <div className="perf-grid">
                        <div className="perf-item">
                          <div className="perf-value">
                            {scoresData?.attendedDays}
                          </div>
                          <div className="perf-label">Attendance</div>
                        </div>
                        <div className="perf-item">
                          <div className="perf-value">
                            {scoresData?.performance}%
                          </div>
                          <div className="perf-label">Performance Score</div>
                        </div>
                        <div className="perf-item">
                          <div className="perf-value">
                            {scoresData?.completedTasks}
                          </div>
                          <div className="perf-label">Tasks Completed</div>
                        </div>
                        <div className="perf-item">
                          <div className="perf-value">
                            {scoresData?.completedProjects}
                          </div>
                          <div className="perf-label">Projects</div>
                        </div>
                        <div className="perf-item">
                          <div className="perf-value">120h</div>
                          <div className="perf-label">Duration</div>
                        </div>
                        <div className="perf-item">
                          <div className="perf-value">0</div>
                          <div className="perf-label">Extra</div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>

            <aside className="right-col">
              <div className="card suggestion-card">
                <h4>You might know</h4>
                <div className="suggestion">
                  <img
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=100&auto=format&fit=crop&crop=faces"
                    alt=""
                  />
                  <div>
                    <strong>Eddie Lebonowsky</strong>
                    <div className="muted small">Mern Stack developer</div>
                  </div>
                </div>

                <div className="suggestion">
                  <img src="intern 3.jpg" alt="" />
                  <div>
                    <strong>Ashley Stone</strong>
                    <div className="muted small">Web Developer</div>
                  </div>
                </div>
              </div>

              <div className="card active-card">
                <h4>Active</h4>
                <div className="suggestion">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop&crop=faces"
                    alt=""
                  />
                  <div>
                    <strong>Shelby Goode</strong>
                    <div className="muted small">Online</div>
                  </div>
                </div>

                <div className="suggestion">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&crop=faces"
                    alt=""
                  />
                  <div>
                    <strong>Robert Baxins</strong>
                    <div className="muted small">Busy</div>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </>
  );
};
