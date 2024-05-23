import React from 'react'
import "./Feedback.css"

const Feedback = () => {
    return (
        <>

            <div className="app-content content ">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        {/* Basic Textarea start  */}
                        <section class="basic-textarea ">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-headerr py-1">
                                        {/* <i style={{
                                            marginRight:"10px"
                                        }} data-feather='edit'></i> */}
                                        <i style={{
                                            marginRight:"10px",
                                            marginTop:"3px"
                                            
                                        }} class="ficon" data-feather="message-square"></i>
                                            <h1 class="card-title">Feedback</h1>

                                        </div>
                                        <div class="card-body">
                                            {/* <p class="card-text">To add a Textarea we have the component <code>textarea</code>.</p> */}
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        {/* <label for="exampleFormControlTextarea1">Textarea</label> */}
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="Your broken piece of words are very valueable for us"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Basic Textarea end  */}
                        </div>
                    </div>

                    <footer class="footer footer-static footer-light" style={{
              padding: "0px",
              margin:"0px",
              marginTop:"175px"
      
            }}>
              <div></div>
              <p class="clearfix mb-0" style={{
                marginleft: "10px"
              }}>
                <span class=" mt-25">COPYRIGHT &copy; 2024<a class="ml-25" href="https://ezitech.org/html-css-internship-opportunities/" target="_blank">Ezitech Institute</a><span class="d-none d-sm-inline-block">, All rights Reserved</span></span><span class="float-md-right d-none d-md-block">

                  <a href="https://www.facebook.com/" style={{
                    color: "#75727f"
                  }}><i class="mr-1 " data-feather='facebook' style={{ color: "#5E5873" }}></i></a>

                  <a href="https://www.instagram.com/"><i class="mr-1 " data-feather='instagram'
                    style={{
                      color: "#75727f",
                      marginleft: "15px",
                      // backgroundColor:"pink"
                    }}></i></a>

                  <a href="https://www.linkedin.com/"><i class="mr-1 " data-feather='linkedin' style={{
                    color: "#75727f",
                    marginleft: "15px",
                    // backgroundColor:"pink"
                  }}></i></a>



                  <a href="https://twitter.com/i/flow/login"><i class="mr-1 " data-feather='youtube' style={{
                    color: "#75727f",
                    marginleft: "15px",
                    // backgroundColor:"pink"
                  }}></i></a>

                </span></p>
            </footer>
                </div>

            </>
            )
}

            export default Feedback;