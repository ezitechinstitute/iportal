import axios from "axios";
import React, { useState } from "react";

export const InvoiceModal = ({ invoiceData }) => {
  const [invoice, setInvoice] = useState({});
  const mEmail = sessionStorage.getItem("email");
  const mName = sessionStorage.getItem("username");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const SubmitInvoice = async () => {
    const invId = "ETI-INV-" + Math.floor(100 + Math.random() * 900);
    setInvoice({
      ...invoice,
      internName: invoiceData.name,
      internEmail: invoiceData.email,
      internPhone: invoiceData.phone,
      managerName: mName,
      managerMail: mEmail,
      invoiceId: invId,
    });

    if (
      invoice.invoiceDate !== undefined &&
      invoice.fullAmount !== undefined &&
      invoice.paidAmount !== undefined &&
      invoice.paymentMode !== undefined
    ) {
      if (
        invoice.internName !== undefined &&
        invoice.internEmail !== undefined &&
        invoice.internPhone !== undefined &&
        invoice.managerName !== undefined &&
        invoice.managerMail !== undefined &&
        invoice.invoiceId !== undefined
      ) {
        try {
          const res = await axios.post(
            "https://api.ezitech.org/add-amount",
            {
              invoice,
            },
            { headers: { "x-access-token": token } }
          );
          alert(res.data);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Are you sure? Please click again on submit to confirm");
      }
    } else {
      alert("Please fill all empty fields first!!!");
    }
  };

  return (
    <>
      {/* <!-- Basic trigger modal --> */}
      <div className="basic-modal">
        {/* <!-- Modal --> */}
        <div
          className="modal fade text-left"
          id="default"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel1">
                  Invoice
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
                  <div className="col-sm-6">
                    <label htmlFor="">Invoice Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="invoiceDate"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="">Due Date</label>
                    <input
                      type="date"
                      name="invoiceDue"
                      onChange={handleInput}
                      className="form-control"
                      defaultValue={"00-00-0000"}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-sm-6">
                    <label htmlFor="">Total Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                      name="fullAmount"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="">Paid Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                      name="paidAmount"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-sm-12">
                    <label htmlFor="">Payment Mode</label>
                    <select
                      className="form-control"
                      name="paymentMode"
                      id=""
                      onChange={handleInput}
                    >
                      <option disabled selected>
                        --Select--
                      </option>
                      <option value="Initial">Initial</option>
                      <option value="Remaining">Remaining</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={SubmitInvoice}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Basic trigger modal end --> */}
    </>
  );
};
