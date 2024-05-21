import React, { useEffect, useRef, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
// import ReactDOM from 'react-dom';
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

export const InternProjects = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);

  const handleQuery = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (queryFinal) => {
    try {
      const res = await axios.post("http://localhost:8800/get-emails", {
        queryFinal,
      });
      //   const data = await res.json();
      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectEmail = (e) => {
    setQuery(e);
    setSelected(true);
  };

  const [currentPage, settCurrentPage] = useState(1);
  const recordPerPage = 15;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== firstIndex) {
      settCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(id) {
    settCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== nPage) {
      settCurrentPage(currentPage + 1);
    }
  }
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Projects</h4>
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#large"
                      >
                        Assign Project
                      </button>
                    </div>

                    <div className="table-responsive text-center">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            {/* <th>CNIC</th> */}
                            <th>Duration</th>
                            <th>Technology</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                      {/* Pagination */}
                      <div className="p-2">
                        {/* <nav> */}
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={prevPage}
                            >
                              Prev
                            </a>
                          </li>
                          {numbers.map((n, i) => (
                            <li
                              className={`page-item ${
                                currentPage === n ? "active" : "   "
                              }`}
                              key={i}
                            >
                              <a
                                href="#"
                                className="page-link"
                                onClick={changeCurrentPage}
                              >
                                {n}
                              </a>
                            </li>
                          ))}
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={nextPage}
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                        {/* </nav> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Modal --> */}
              <div
                class="modal fade text-left"
                id="large"
                tabindex="-1"
                role="dialog"
                aria-labelledby="myModalLabel17"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="myModalLabel17">
                        Assign Project
                      </h4>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12">
                          <form class="form">
                            <div class="row">
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="first-name-column">
                                    Project Title
                                  </label>
                                  <input
                                    type="text"
                                    id="first-name-column"
                                    class="form-control"
                                    placeholder="Project Title"
                                    name="fname-column"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="last-name-column">
                                    Project URL
                                  </label>
                                  <input
                                    type="text"
                                    id="last-name-column"
                                    class="form-control"
                                    placeholder="Project URL"
                                    name="lname-column"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="city-column">Start Date</label>
                                  <input
                                    type="date"
                                    id="city-column"
                                    class="form-control"
                                    // placeholder="City"
                                    name="city-column"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="city-column">End Date</label>
                                  <input
                                    type="date"
                                    id="city-column"
                                    class="form-control"
                                    // placeholder="City"
                                    name="city-column"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="company-column">Supervisor</label>
                                  <input
                                    type="text"
                                    id="company-column"
                                    class="form-control"
                                    name="company-column"
                                    placeholder="Supervisor"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 col-12">
                                <div class="form-group">
                                  <label for="email-id-column">Email</label>
                                  <input
                                    type="text"
                                    id="email-id-column"
                                    value={query}
                                    onChange={handleQuery}
                                    class="form-control"
                                    name="email-id-column"
                                    placeholder="Email"
                                  />

                                  <ul style={{ listStyle: "none" }}>
                                    {!selected
                                      ? suggestions.map((email, index) => (
                                          <li
                                            className="border shadow rounded p-1"
                                            key={index}
                                            onClick={() =>
                                              selectEmail(email.email)
                                            }
                                            style={{ cursor: "pointer" }}
                                          >
                                            {email.email}
                                          </li>
                                        ))
                                      : " "}
                                  </ul>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="email-id-column">
                                    Description
                                  </label>
                                  <textarea
                                    name=""
                                    className="form-control"
                                    id=""
                                    placeholder="Description"
                                  ></textarea>
                                  {/* <div onClick={focusEditor}>
                                <Editor
                                  ref={editor}
                                  editorState={editorState}
                                  onChange={(editorState) =>
                                    setEditorState(editorState)
                                  }
                                /> */}
                                  {/* </div> */}
                                </div>
                              </div>
                              <div class="col-12">
                                <button
                                  type="reset"
                                  class="btn btn-primary mr-1"
                                >
                                  Submit
                                </button>
                                <button
                                  type="reset"
                                  class="btn btn-outline-secondary"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
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
