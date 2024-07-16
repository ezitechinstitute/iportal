import React from 'react'
import { ManagerSidebar } from '../components/ManagerSidebar'
import { ManagerTopbar } from '../components/ManagerTopbar'

const Invoice = () => {
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


          <div class="col-12 col-xl-12 col-md-12">
            <div class="card card-statistics">
              <div class="card-header">
                <h1 class="card-title" style={{
                  fontSize:"30px",
                  marginLeft:"-15px"
                }}>Invoice</h1>
                <div class="d-flex align-items-center">
                  {/* <p class="card-text font-small-2 mr-25 mb-0">
                          Updated 1 month ago
                        </p> */}
                </div>
              </div>

              <div class="card-body invoice-padding invoice-product-details">
                <form class="source-item">
                  <div data-repeater-list="group-a">
                    <div class="repeater-wrapper" data-repeater-item>
                      <div class="row">
                        <div class="col-12 d-flex product-details-border position-relative pr-0">
                          <div class="row w-100 pr-lg-0 pr-1 py-2">
                            <div class="col-lg-6 col-12 mb-lg-0 mb-2 mt-lg-0 mt-2 ">
                              <p class="card-text col-title mb-md-50 mb-0">Enter Amount</p>
                              <input class="form-control item-details" style={{
                                marginBottom:"20px"
                              }}/>
                            </div>

                            <div class="col-lg-6 col-12 mb-lg-0 mb-2 mt-lg-0 mt-2">
                              <p class="card-text col-title mb-md-50 mb-0">Instructor Email</p>
                              <select class="form-control item-details">
                                <option value="App Design">App Design</option>
                                <option value="App Customization" selected>--select--</option>
                                <option value="ABC Template">ABC Template</option>
                                <option value="App Development">App Development</option>
                              </select>
                            </div>


                            <div class="col-lg-6 col-12 mb-lg-0 mb-2 mt-lg-0 mt-2">
                              <p class="card-text col-title mb-md-50 mb-0">Intern Email</p>
                              <input class="form-control item-details" />
                            </div>

                            <div class="col-lg-6 col-12 mb-lg-0 mb-2 mt-lg-0 mt-2">
                              <p class="card-text col-title mb-md-50 mb-0"  style={{
                                marginTop:"0px"
                              }}>Intern Phone</p>
                              <input class="form-control item-details"/>

                              <button type="button" class="btn btn-primary " style={{
                                marginTop:"30px",
                                marginLeft:"-50px"
                              }}>
                                                    {/* <i data-feather="plus" class="mr-25"></i> */}
                                                    <span class="">Submit</span>
                                                </button>

                            </div>


                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Invoice