import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-quill/dist/quill.bubble.css"; // Bubble theme
import axios from "axios";

export const WithdrawRequest = ({ values }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [value, setValue] = useState("");
  const [request, setRequest] = useState({
    description: null,
    etiId: null,
    reqBy: null,
  });

  const handleChange = (content) => {
    setValue(content);
  };

  const handleInput = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  //   useEffect(() => {
  //     const CalculateDuration = () => {
  //       const startDate = new Date(project.startDate);
  //       const endDate = new Date(project.endDate);
  //       const duration = endDate.getTime() - startDate.getTime();
  //       const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  //       setProject({ ...project, durationDays: days });
  //     };

  //     CalculateDuration();
  //   }, [project.startDate, project.endDate]);

  const SubmitRequest = async () => {
    setRequest({
      ...request,
      description: value,
      etiId: values.seid,
      reqBy: values.sid,
    });

    if (
      request.bank !== undefined &&
      request.acNo !== undefined &&
      request.acName !== undefined &&
      request.date !== undefined &&
      request.amount !== undefined
    ) {
      if (request.description !== null) {
        await axios
          .post(
            "https://api.ezitech.org/create-withdraw-req",
            { request },
            {
              headers: { "x-access-token": token },
            }
          )
          .then((res) => {
            alert(res.data.msg);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Are you sure? Click again on Assign Project");
      }
    } else {
      alert("Please fill empty field first!!!");
    }
  };

  return (
    <>
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="defaultwithdraw"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Withdraw Request
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
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-12">
                    <label htmlFor="">Bank Name</label>
                    <input
                      type="text"
                      name="bank"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Account Number</label>
                    <input
                      type="text"
                      name="acNo"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Account Name</label>
                    <input
                      type="text"
                      name="acName"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Date</label>
                    <input
                      type="date"
                      name="date"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12">
                    <label htmlFor="">Description</label>
                    <br />
                    <ReactQuill
                      value={value}
                      onChange={handleChange}
                      theme="snow" // Snow is a popular Quill theme
                      placeholder="Project description..."
                    />
                    {/* <div>
                        <h3>Preview:</h3>
                        <div dangerouslySetInnerHTML={{ __html: value }}></div>
                      </div> */}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={SubmitRequest}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
