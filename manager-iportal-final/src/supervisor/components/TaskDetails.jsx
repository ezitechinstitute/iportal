import axios from "axios";
import React, { useEffect, useState } from "react";

export const TaskDetails = ({ values }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const [data, setData] = useState([]);

  const GetTaskDetails = async () => {
    await axios
      .get("http://localhost:8800/get-task-details", {
        params: {
          intId: values.etiId,
          pId: values.projectId,
          tNo: values.taskNo,
        },
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetTaskDetails();
  }, [GetTaskDetails]);
  return (
    // <!-- Modal -->
    <div
      className="modal fade text-left"
      id="xlarge"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel16"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel16">
              Task Details
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Loading...</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
