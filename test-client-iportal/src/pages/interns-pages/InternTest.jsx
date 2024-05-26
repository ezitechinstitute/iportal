import React, { useEffect, useState } from "react";
import InternTopbar from "../../components/interns-components/InternTopbar/InternTopbar";
import InternSidebar from "../../components/interns-components/InternSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const InternTest = () => {
  const [testStatus, setTestStatus] = useState(false);
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    status: sessionStorage.getItem("internStatus"),
    tech: sessionStorage.getItem("technology"),
  });
  const [task, setTask] = useState([]);

  if (!checkLoggedIn) {
    navigate("/");
  }

  const GetTask = async () => {
    const res = await axios.post(
      "http://localhost:8800/intern-test",
      {
        technology: user.tech,
      },
      { headers: { "x-access-token": token } }
    );
    setTask(res.data);
  };

  useEffect(() => {
    GetTask();
  }, [GetTask]);

  const MarkTaskComleted = () => {
    axios
      .post(
        "http://localhost:8800/mark-test-complete",
        { name: user.username, email: user.email, technology: user.tech },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data === 1) {
          setTestStatus(true);
          alert("Task Completed");
        } else {
          alert("Something Went Wrong!!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {/* <!-- Info table about actions --> */}
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-content collapse show">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-12 p-3">
                          {task.map((rs) => (
                            <>
                              <h4>Task Title: {rs.title}</h4>

                              <br />
                              <span>
                                <h4>Description</h4>
                              </span>
                              <p>{rs.description}</p>
                            </>
                          ))}

                          <br />
                          {testStatus ? (
                            <button className="btn btn-success">
                              Completed
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger"
                              onClick={MarkTaskComleted}
                            >
                              Is the Task Completed?
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/ Info table about actions --> */}
          </div>
        </div>
      </div>
    </>
  );
};
