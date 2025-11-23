import React, { useState } from "react";
import "./InternAssets/style.scoped.css";
import logo from "./InternAssets/ezitech.png";
import { useGetInternsQuery } from "../../../services/internsApi";

export const InternsGrid = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, error, isLoading } = useGetInternsQuery({ page, limit });

  return (
    <>
      <div className="our-interns">
        <header className="top-navbar">
          <div className="logo">
            <img src={logo} alt="Ezitech Logo" />
          </div>
        </header>

        <section className="hero">
          <div className="overlay">
            <h1>Certified Interns</h1>
          </div>
        </section>

        <section className="product">
          <div className="widget">
            <div className="widget-header">
              <h2>OUR CERTIFIED INTERNS</h2>
              <div className="show-all">
                <a href="#">Show all</a>
              </div>
            </div>

            {isLoading && <div className="cards">Loading interns...</div>}
            {error && <div className="cards">Error loading interns</div>}
            {!isLoading &&
              !error &&
              (() => {
                const items = (data && data.items) || [];
                const total = (data && data.total) || items.length;
                const totalPages = Math.max(1, Math.ceil(total / limit));
                return (
                  <>
                    <div className="cards">
                      {items.map((intern, idx) => (
                        <article key={intern.id || idx} className="card">
                          <div
                            className="cover"
                            style={{
                              backgroundImage: `url(${
                                intern.cover || "background.jpg"
                              })`,
                            }}
                          ></div>
                          <div className="avatar-wrap">
                            <div className="avatar">
                              <img
                                src={intern.avatar || "intern1.webp"}
                                alt={intern.name || "profile"}
                              />
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="name">
                              {intern.name || intern.fullName || "Unknown"}
                            </div>
                            <div className="role">
                              {intern.technology || intern.title || ""}
                            </div>
                            <div className="spacer"></div>
                            <a
                              className="showprofile-btn"
                              href={intern.profileUrl || "#"}
                            >
                              View Profile
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="pagination-bar">
                      <button
                        className="pagination-btn"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                      >
                        &laquo; Prev
                      </button>
                      <span
                        style={{
                          margin: "0 18px",
                          color: "#555",
                          fontWeight: 500,
                          fontSize: 15,
                        }}
                      >
                        {page} / {totalPages}
                      </span>
                      <button
                        className="pagination-btn"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page >= totalPages}
                      >
                        Next &raquo;
                      </button>
                    </div>
                  </>
                );
              })()}
          </div>
        </section>
      </div>
    </>
  );
};
