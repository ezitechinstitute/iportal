import React, { useState } from "react";
import "./InternAssets/profile.scoped.css";

export const InternProfile = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <>
      <div className="intern-profile">
        <main className="main">
          <header className="topbar">
            <div className="logo">
              <img src="ezitech.png" alt="Ezitech Logo" />
            </div>
            <div className="search-box">
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
            </div>
          </header>

          <section className="profile-card">
            <div
              className="cover"
              style={{ backgroundImage: "url('interns1.jpg')" }}
            >
              <div className="cover-overlay"></div>
            </div>

            <div className="profile-strip">
              <div className="avatar">
                <img src="intern3.jpg" alt="avatar" />
              </div>

              <div className="profile-info">
                <h1 className="name">
                  Charles Deo
                  <img
                    src="verified_emoji_64.png"
                    alt="verified"
                    className="verified-icon"
                  />
                </h1>
                <p className="role muted">Mern Stack Developer</p>
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
                    <i className="fa-solid fa-user icon"></i> Male
                  </li>
                  <li>
                    <i className="fa-solid fa-cake-candles icon"></i> Born June
                    26, 1990
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot icon"></i> 2239 Hog
                    Camp Road, Schaumburg
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope icon"></i>{" "}
                    charles5182@gmail.com
                  </li>
                  <li>
                    <i className="fa-solid fa-phone icon"></i> 33757005467
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
                  <div className="post-card card">
                    <div className="post-header">
                      <img className="post-avatar" src="intern3.jpg" alt="" />
                      <div>
                        <div className="post-author">Charles Deo</div>
                        <div className="muted small">1m ago</div>
                      </div>
                      <div className="post-more muted">…</div>
                    </div>

                    <div className="post-body">
                      <p className="post-text">
                        Frontend Web Development Project 01
                      </p>
                      <img className="post-img" src="interns1.jpg" alt="post" />
                    </div>

                    <div className="post-footer">
                      <div className="engage">
                        <span>
                          <button className="engage-item">
                            <i
                              className="fa-brands fa-github"
                              style={{ color: "white", fontSize: "25px" }}
                            ></i>
                            <strong>GitHub</strong>
                          </button>
                        </span>
                        <span>
                          <button className="engage-item">
                            <i
                              className="fa-solid fa-link"
                              style={{ color: "white", fontSize: "20px" }}
                            ></i>
                            <strong>Live url</strong>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="post-card card">
                    <div className="post-header">
                      <img className="post-avatar" src="intern3.jpg" alt="" />
                      <div>
                        <div className="post-author">Charles Deo</div>
                        <div className="muted small">2h ago</div>
                      </div>
                      <div className="post-more muted">…</div>
                    </div>

                    <div className="post-body">
                      <p className="post-text">
                        Frontend Web Development Project 02
                      </p>
                      <img className="post-img" src="interns1.jpg" alt="post" />
                    </div>

                    <div className="post-footer">
                      <div className="engage">
                        <span>
                          <button className="engage-item">
                            <i
                              className="fa-brands fa-github"
                              style={{ color: "white", fontSize: "25px" }}
                            ></i>
                            <strong>GitHub</strong>
                          </button>
                        </span>
                        <span>
                          <button className="engage-item">
                            <i
                              className="fa-solid fa-link"
                              style={{ color: "white", fontSize: "20px" }}
                            ></i>
                            <strong>Live url</strong>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="performance-section card">
                  <h3>Performance Summary</h3>
                  <div className="perf-grid">
                    <div className="perf-item">
                      <div className="perf-value">92%</div>
                      <div className="perf-label">Attendance</div>
                    </div>
                    <div className="perf-item">
                      <div className="perf-value">88</div>
                      <div className="perf-label">Performance Score</div>
                    </div>
                    <div className="perf-item">
                      <div className="perf-value">24</div>
                      <div className="perf-label">Tasks Completed</div>
                    </div>
                    <div className="perf-item">
                      <div className="perf-value">6</div>
                      <div className="perf-label">Projects</div>
                    </div>
                    <div className="perf-item">
                      <div className="perf-value">120h</div>
                      <div className="perf-label">Duration</div>
                    </div>
                    <div className="perf-item">
                      <div className="perf-value">+3</div>
                      <div className="perf-label">Extra</div>
                    </div>
                  </div>
                </div>
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
