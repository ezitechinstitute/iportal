import React, { useState, useEffect } from "react";
import "./InternAssets/style.scoped.css";
import logo from "./InternAssets/ezitech.png";
import { useGetInternsQuery } from "../../../services/internsApi";
import { InternFooter } from "./InternFooter";
import { Link } from "react-router-dom";

// Inline SVG fallback avatar (small, no external file needed)
const FALLBACK_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='1.5' y='1.5' width='21' height='21' rx='4' ry='4' fill='%23f4f6f8' stroke='%23e2e6ea'/><circle cx='12' cy='9' r='3' fill='%23dfe6eb' stroke='%239aa6b2'/><path d='M4.5 20c1.5-3 4.5-4.5 7.5-4.5s6 1.5 7.5 4.5' fill='%23dfe6eb' stroke='%239aa6b2'/></svg>`
)} `;

export const InternsGrid = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, error, isLoading } = useGetInternsQuery({ page, limit });

  useEffect(() => {
    if (!data) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          const cover = card.querySelector(".cover");
          const img = card.querySelector("img[data-src]");
          try {
            if (cover) {
              const coverUrl = cover.getAttribute("data-cover");
              if (coverUrl) cover.style.backgroundImage = `url(${coverUrl})`;
            }
            if (img) {
              const src = img.getAttribute("data-src");
              if (src) img.src = src;
            }
          } catch (err) {
            // ignore any DOM errors
          }
          obs.unobserve(card);
        });
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    const cards = document.querySelectorAll(".our-interns .card");
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [data]);

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
        <br />

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
                            data-cover={intern.cover || ""}
                            style={{
                              backgroundImage: intern.cover
                                ? "none"
                                : `url(${FALLBACK_AVATAR})`,
                            }}
                          ></div>
                          <div className="avatar-wrap">
                            <div className="avatar">
                              <img
                                src={FALLBACK_AVATAR}
                                data-src={intern.avatar || ""}
                                alt={intern.name || "profile"}
                                loading="lazy"
                                onError={(e) => {
                                  try {
                                    const img = e.currentTarget;
                                    if (img.dataset.fallback !== "true") {
                                      img.dataset.fallback = "true";
                                      img.src = FALLBACK_AVATAR;
                                    }
                                  } catch (err) {
                                    /* ignore */
                                  }
                                }}
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
                            <Link
                              className="showprofile-btn"
                              to={
                                `/public-profile/${encodeURIComponent(
                                  intern.eti_id
                                )}` || "#"
                              }
                            >
                              View Profile
                            </Link>
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

      <InternFooter />
    </>
  );
};
