import React from 'react'
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from 'react-router-dom';

const Technology= () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
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
          <div className="content-body"></div>
          

          <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Technology</h4>
              
                      <div class="ag-btns d-flex flex-wrap">
                                            <input type="text" class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0" id="filter-text-box" placeholder="Search...." />
                                            <div class="btn-export">
                                                <button class="btn btn-primary ag-grid-export-btn">Add Technology</button>
                                            </div>
                                        </div>
              
                    </div>


                    <section id="complex-header-datatable">
                      <div class="row">
                        <div class="col-12">
                          <div class="card">
                
                            <div class="card-datatable">
                              <table class="dt-complex-header table table-bordered table-responsive">
                                <thead>

                                  <tr>
                                    <th>#</th>
                                    <th>Technology Name</th>
                                    <th>Technology Points</th>
                                    <th>Total</th>
                                    <th class="cell-fit">Status</th>
                                    <th>Commission</th>
                                    <th>Action</th>
                            
                                  </tr>

                                  <tr>
                                                <td>1111</td>
                                                <td>Faisal Bank</td>
                                                <td>00000000000000000000000</td>
                                                <td>mmmmmmaaaaatttttttt---</td>
                                                <td><button class="btn btn-danger">disable</button></td>
                                                <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                                <td> <button class="btn btn-secondary">Action</button></td>
                                                {/* <td>12645667</td> */}
                                             

                                             
                                            </tr>

                                            <tr>
                                                <td>1111</td>
                                                <td>Faisal Bank</td>
                                                <td>00000000000000000000000</td>
                                                <td>mmmmmmaaaaatttttttt---</td>
                                                <td><button class="btn btn-success">active</button></td>
                                                <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                                <td> <button class="btn btn-secondary">Action</button></td>
                                                {/* <td>12645667</td> */}
                                             

                                             
                                            </tr>

                                            <tr>
                                                <td>1111</td>
                                                <td>Faisal Bank</td>
                                                <td>00000000000000000000000</td>
                                                <td>mmmmmmaaaaatttttttt---</td>
                                                <td><button class="btn btn-danger">disable</button></td>
                                                <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                                <td> <button class="btn btn-secondary">Action</button></td>
                                                {/* <td>12645667</td> */}
                                             

                                             
                                            </tr>

                                            <tr>
                                                <td>1111</td>
                                                <td>Faisal Bank</td>
                                                <td>00000000000000000000000</td>
                                                <td>mmmmmmaaaaatttttttt---</td>
                                                <td><button class="btn btn-success">active</button></td>
                                                <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                                <td> <button class="btn btn-secondary">Action</button></td>
                                                {/* <td>12645667</td> */}
                                             

                                             
                                            </tr>
                                            <tr>
                                                <td>1111</td>
                                                <td>Faisal Bank</td>
                                                <td>00000000000000000000000</td>
                                                <td>mmmmmmaaaaatttttttt---</td>
                                                <td><button class="btn btn-danger">disable</button></td>
                                                <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                                <td> <button class="btn btn-secondary">Action</button></td>
                                                {/* <td>12645667</td> */}
                                             

                                             
                                            </tr>

                                            <tr>
                                                <td>1111</td>
                                                <td>Faisal Bank</td>
                                                <td>00000000000000000000000</td>
                                                <td>mmmmmmaaaaatttttttt---</td>
                                                <td><button class="btn btn-success">active</button></td>
                                                <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                                                <td> <button class="btn btn-secondary">Action</button></td>
                                                {/* <td>12645667</td> */}
                                             

                                             
                                            </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>



                    
                  </div>
                </div>
              </div>
            </section>
</div>
</div>

    </>
  )
}

export default Technology