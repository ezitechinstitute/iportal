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


                        <div class="col-lg-12 col-md-6">
                    <div class="card">
                    <div class="">
                                <h2 class="modal-title ml-4 mb-4 mt-2" id="myModalLabel17">Leave Application</h2>
                  </div>
                    <div class="row ">
                                        <div class="col-md-5 col-12 ml-4">
                                            <div class="form-group">
                                                <label for="first-name-column">TO</label>
                                                <input type="text" id="last-name-column" class="form-control" placeholder="TO" name="lname-column" />
                                  
                                           
                                            </div>
                                        </div>
                                        <div class="col-md-5 col-12 ml-1">
                                            <div class="form-group">
                                                <label for="last-name-column">FROM</label>
                                                <input type="text" id="last-name-column" class="form-control" placeholder="FROM" name="lname-column" />
                                            </div>
                                        </div>



                                        <div class="col-md-10 col-12 ml-4">
                                            <div class="form-group">
                                                <label for="last-name-column">REASON</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder=""></textarea>
                                            </div>
                                        </div>
                                        
                                        <div class="col-12 text-center mb-1">
                                            <button type="reset" class="btn btn-primary mr-1">Submit</button>
                                            {/* <button type="reset" class="btn btn-outline-secondary">Reset</button> */}
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