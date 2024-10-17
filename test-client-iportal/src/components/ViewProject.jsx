import React from "react";

export const ViewProject = () => {
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade text-left"
        id="large"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel17"
        aria-hidden="true"
      >
        <div
          className="modal-dialog  modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel17">
                Large Modal
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
              I love tart cookie cupcake. I love chupa chups biscuit. I love
              marshmallow apple pie wafer liquorice. Marshmallow cotton candy
              chocolate. Apple pie muffin tart. Marshmallow halvah pie marzipan
              lemon drops jujubes. Macaroon sugar plum cake icing toffee.
            </div>
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
    </>
  );
};
