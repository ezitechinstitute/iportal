import React from 'react'
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

const ManagerLeave = () => {
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


                        <div className="col-lg-12 col-md-6">
                    <div className="card">
                    <div className="">
                                <h2 className="modal-title ml-4 mb-4 mt-2" id="myModalLabel17">Leave Application</h2>
                  </div>
                    <div className="row ">
                                        <div className="col-md-5 col-12 ml-4">
                                            <div className="form-group">
                                                <label for="first-name-column">TO</label>
                                                <input type="text" id="last-name-column" className="form-control" placeholder="TO" name="lname-column" />
                                  
                                           
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-12 ml-1">
                                            <div className="form-group">
                                                <label for="last-name-column">FROM</label>
                                                <input type="text" id="last-name-column" className="form-control" placeholder="FROM" name="lname-column" />
                                            </div>
                                        </div>



                                        <div className="col-md-10 col-12 ml-4">
                                            <div className="form-group">
                                                <label for="last-name-column">REASON</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" placeholder=""></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 text-center mb-1">
                                            <button type="reset" className="btn btn-primary mr-1">Submit</button>
                                            {/* <button type="reset" className="btn btn-outline-secondary">Reset</button> */}
                                        </div>
                                    </div>
                                    </div>
                        </div>







               </div>
               </div>

               </div>
            

    </>
  )
}

export default ManagerLeave