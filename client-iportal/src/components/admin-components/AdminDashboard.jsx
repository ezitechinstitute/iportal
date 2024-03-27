import React from "react";

export const AdminDashboard = () => {
  return (
    <>
      <div class="app-content content ">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
          <div class="content-header row"></div>
          <div class="content-body">
            {/* <!-- Dashboard --> */}
            <section id="dashboard-ecommerce">
              <div class="card card-congratulation-medal rounded-0">
                <div class="card-body">
                  <h3 className="roboto ">Interview Statistics</h3>
                </div>
              </div>
              <div class="row match-height">
                {/* <!-- Medal Card --> */}

                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">9</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">
                        Yesterday Internview
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">7</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">
                        Today Internview
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">Token</h5>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="dashboard-ecommerce">
              <div class="card card-congratulation-medal rounded-0">
                <div class="card-body">
                  <h3 className="roboto">Dashboard Statistics</h3>
                </div>
              </div>
              <div class="row match-height">
                {/* <!-- Medal Card --> */}

                <div class="col-xl-3 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">9</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">Total Interns</h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center ">
                      <h3 className="roboto mb-75 mt-2 pt-50">7</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">Test</h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">In Progress</h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">Completed</h5>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="dashboard-ecommerce">
              <div class="row match-height">
                {/* <!-- Medal Card --> */}

                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">1193</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">
                        Total Projects
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">656</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">In Progress</h5>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal">
                    <div class="card-body text-center">
                      <h3 className="roboto mb-75 mt-2 pt-50">537</h3>
                      <h5 className="roboto mb-75 mt-2 pt-50">Completed</h5>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
