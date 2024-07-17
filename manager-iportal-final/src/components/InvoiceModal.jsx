import React from "react";

export const InvoiceModal = () => {
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
                    <input type="date" className="form-control"/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="">Due Date</label>
                    <input type="date" className="form-control"/>
                </div>
               </div>

               <div className="row mt-2">
                <div className="col-sm-6">
                    <label htmlFor="">Total Amount</label>
                    <input type="number" className="form-control" placeholder="0"/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="">Paid Amount</label>
                    <input type="number" className="form-control" placeholder="0"/>
                </div>
               </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
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
