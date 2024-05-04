import React, { useEffect, useState } from 'react';
import "./InternDashboard.css";
import logo10 from './mediaa/logo10.png';
import logo6 from './mediaa/logo6.jpg';
import logo2 from './mediaa/logo2.png';
import logo8 from './mediaa/logo8.png';
import logo3 from './mediaa/logo3.png';



export const InternDashboard = () => {

  const speed = 200;
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const myNum = document.querySelectorAll('.count');
    setCounts(Array.from(myNum));
  }, []);

  useEffect(() => {
    const updateNumber = (myCount, targetCount, initCount) => {
      let incrementNumber = Math.floor(targetCount / speed);

      const update = () => {
        initCount = initCount + incrementNumber;
        myCount.innerText = initCount;

        if (initCount < targetCount) {
          setTimeout(() => {
            update();
          }, 9);
        }
      };

      update();
    };

    counts.forEach((myCount) => {
      let targetCount = parseInt(myCount.dataset.count);
      let initCount = +myCount.innerText;

      updateNumber(myCount, targetCount, initCount);
    });
  }, [counts]);


  return (
    <div className="app-content content ">
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow"></div>
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          {/* <!-- Dashboard --> */}
          <section id="dashboard-ecommerce">
            <div className="card card-congratulation-medal rounded-0">
              <div className="card-body">
                <h3 className="roboto">Dashboard Statistics</h3>
              </div>

            </div>

            <div class="container-fluid" >
              <div class=" row col-lg-12">
                <marquee><p class="marquee">14th Year Anniversary.<span class="ezi">Ezitech Institute</span> has completed 14 years.3963 has completed their internship.Thanks all for yours unconditional support</p></marquee>

              </div>
              {/* ...........cards............... */}
              <div class="row">
                <div class="col-lg-8 col-12" >
                  <div class="row">

                    {/* card1 */}
                    <div class="col-lg-4 col-md-6 col-12">
                      <div>
                        <div class="card1">
                          <div class="card py-2">
                            <div class="d-flex">
                              <i class=" icon px-1 mx-1"><i data-feather="grid"></i></i>
                              <h3>0</h3>
                            </div>
                            <div class="card-body pl-1 mt-1">
                              <h4 class="card-title">Total Projects</h4>
                              <p class="card-text">
                                3.5% Total Progress
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* card 2 */}
                    <div class="col-lg-4 col-md-6 col-12">
                      <div>
                        <div class="card2 ">
                          <div class="card py-2">
                            <div class="d-flex">
                              <i class=" icon px-1 mx-1"><i data-feather='loader'></i></i>
                              <h3>0</h3>
                            </div>
                            <div class="card-body pl-1 mt-1">
                              <h4 class="card-title">In Progress</h4>
                              <p class="card-text">
                                3.5% Total Progress
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* card 3 */}
                    <div class="col-lg-4 col-md-6 col-12">
                      <div>
                        <div class="card3">
                          <div class="card py-2">
                            <div class="d-flex">
                              <i class=" icon px-1 mx-1"><i data-feather='menu'></i></i>
                              <h3>0</h3>
                            </div>
                            <div class="card-body pl-1 mt-1">
                              <h4 class="card-title">Complete Projects</h4>
                              <p class="card-text">
                                3.5% Total Progress
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  {/* </div> */}
                  {/* <div class=" row"> */}

                    {/* card 4 */}
                    <div class="col-lg-4 col-md-6 col-12">
                      <div>
                        <div class="card4">
                          <div class="card py-2">
                            <div class="d-flex">
                              <i class=" icon px-1 mx-1"><i data-feather='check-square'></i></i>
                              <h3>0</h3>
                            </div>
                            <div class="card-body pl-1 mt-1">
                              <h4 class="card-title">Total Attendence</h4>
                              <p class="card-text">
                                0 Last Week
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* card 5 */}
                    <div class="col-lg-4 col-md-6 col-12">
                      <div>
                        <div class="card5">
                          <div class="card py-2">
                            <div class="d-flex">
                              <i class=" icon px-1 mx-1"><i data-feather='coffee'></i></i>
                              <h3>0</h3>
                            </div>
                            <div class="card-body pl-1 mt-1">
                              <h4 class="card-title">Holidays</h4>
                              <p class="card-text">
                                0 Last Week
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* card 6 */}
                    <div class="col-lg-4 col-md-6 col-12">
                      <div>
                        <div class="card6">
                          <div class="card py-2">
                            <div class="d-flex">
                              <i class=" icon px-1 mx-1"><i data-feather='home'></i></i>
                              <h3>0</h3>
                            </div>
                            <div class="card-body pl-1 mt-1">
                              <h4 class="card-title">Leaves</h4>
                              <p class="card-text">
                                0 Last Week
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ..................read notes................ */}
                <div class="cardd col-lg-4 col-md-6 col-12">
                  <div class="card card-congratulation-meda">
                    <div class="card-body">
                      <h5 class="notes mb-5 mr-1">Notifications</h5>

                      <div class="card-footer">
                        <button type="button" class="wattsapp btn btn-success px-2">Join Wattsapp Group</button>
                      </div>


                      <div class="card-footer ">
                        <h3 class="card-text font-medium-1">Visit Our Tech Blogging Website</h3>
                        <div class="d-flex">
                          <p class=" tags mb-75 mt-2 pt-50 ">
                            <a href="">Eziblogs</a>
                          </p>
                          <p class=" tags mb-75 mt-2 pt-50 ">
                            <a href="">|</a>
                          </p>
                          <p class=" tags mb-75 mt-2 pt-50">
                            <a href="">  Ezicoding</a>
                          </p>
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
              </div>

              {/* ......................charts................ */}
              <div class="row">
                <div class="col-lg-8 col-12">
                  <div className="tracker">
                    <div class="col-lg-9  col-12">
                      <div class="card">
                        <div class="card-header d-flex justify-content-between pb-0">
                          <h2 class="card-title font-weight-bolder font-large-1">Project Tracker</h2>
                          <div class="dropdown chart-dropdown">
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="column">
                            <div class="col-sm-2 col-12 d-flex flex-column flex-wrap text-center">
                              <h1 class="font-large-2 font-weight-bolder mt-2 mb-0">0</h1>
                              <h5> <span>Total Projects</span> </h5>
                            </div>

                            {/* icon 1 */}
                            <div class="d-flex mt-2 ml-2">
                              <div class="icon mr-2 mt-1">
                                <i class=" icon1 px-1 mr-1"><i data-feather='folder-plus'></i></i>
                              </div>
                              <div class="">
                                <h5 class=" font-weight-bolder">Total Tasks</h5>
                                <p>0</p>
                              </div>

                            </div>
                            {/* icon 2 */}
                            <div class="d-flex mt-2 ml-2">
                              <div class="icon mr-2 mt-1">
                                <i class=" icon2 px-1 mr-1"><i data-feather='loader'></i></i>
                              </div>
                              <div class="">
                                <h5 class=" font-weight-bolder">In Progress</h5>
                                <p>0</p>
                              </div>

                            </div>
                            {/* icon 3 */}
                            <div class="d-flex mt-2 ml-2 mb-5">
                              <div class="icon mr-2 mt-1">
                                <i class=" icon3 px-1 mr-1"><i data-feather='menu'></i></i>
                              </div>
                              <div class="">
                                <h5 class=" font-weight-bolder">Completed Tasks</h5>
                                <p>0</p>
                              </div>

                            </div>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* .............leadership.............. */}
                <div class="col-lg-4  col-12">

                  <section id="row-grouping-datatable">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div class="card-header border-bottom">
                            <h4 class="card-title">Leadersboards</h4>
                          </div>
                          <div class="card-datatable">
                            <table class="dt-row-grouping table">
                              <thead>
                                <tr>
                                  {/* <th></th> */}
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Position</th>

                                </tr>
                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>
                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>
                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>
                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>

                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>
                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>
                                <tr>

                                  <th></th>
                                  <th></th>
                                  <th></th>

                                </tr>
                              </thead>

                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* <!--/end  leadership --> */}

                </div>
              </div>

              {/* ........................counter ....................*/}

              <div class="row">
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="card">
                    <div class="counter1 card-header align-items-center p-4">
                      <div className='count1'>
                      <i class=""><i data-feather='users'></i></i>
                        <div class="d-flex ml-2">
                          <h1 className="count" data-count="14031">0</h1>
                          <h1>+</h1>
                        </div>
                        <p class="ml-1">Total Internies</p>
                      </div>

                    </div>

                  </div>
                </div>
                <div class=" col-lg-3 col-sm-6 col-12">
                  <div class="card">
                    <div class="counter2 card-header align-items-center p-4">
                      <div className='count1'>
                      <i class=""><i data-feather='layers'></i></i>
                        <div class="d-flex ml-2">
                          <h1 className="count" data-count="14031">0</h1>
                          <h1>+</h1>
                        </div>

                        <p>Certified Internies</p>
                      </div>

                    </div>

                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="card">
                    <div class=" counter3 card-header align-items-center p-4">
                      <div className='count1'>
                      <i class=""><i data-feather='user-check'></i></i>
                      <div class="d-flex ml-2">
                          <h1 className="count" data-count="8401">0</h1>
                          <h1>+</h1>
                        </div>
                        <p class="">Real Professionals</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="card">
                    <div class="counter4 card-header align-items-center p-4">
                      <div className='count1'>
                      <i class=""><i data-feather="grid"></i></i>
                        <div class="d-flex ml-2">
                          <h1 className="count" data-count="8401">0</h1>
                          <h1>+</h1>
                        </div>
                        <p class="para">Total Projects</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* <Logos/> */}


<marquee>
<div class="row col-lg-12 col-md-12 col-12 my-3">
<div class="align-items-center d-flex">
<div class="logo1">
  <img src={logo10}></img>
</div>

<div class="logo2 ">
  <img src={logo2}></img>
</div>

<div class="logo3">
  <img src={logo8}></img>
</div>

<div class="logo4 ">
  <img src={logo6}></img>
</div>

<div class="logo5">
  <img src={logo3}></img>
</div>
</div>
</div>

</marquee>
         
              {/* ................footer................. */}
              <div className="foot card card-congratulation-medal rounded-0 ">
                <div className="card-body">
                  <div class=" row col-lg-12 col-md-12 col-12  ">
                    <div class="col-lg-10 col-md-9 col-12 " >
                      <p class="copy mb-0 ">&copy; 2024 Ezitech Institute . All rights are reserved</p>
                    </div>
                    <div class="links d-flex col-lg-2 col-md-3 col-12  text-dark">
                      <div className="fb">
                        <a href="https://www.facebook.com/"><i class="mr-1 text-light" data-feather='facebook'></i></a>
                      </div>

                      <div className="linkedin">
                        <a href="https://www.linkedin.com/"><i class="mr-1 text-light" data-feather='linkedin'></i></a>
                      </div>

                      <div className="instagram">
                        <a href="https://www.instagram.com/"><i class="mr-1 text-light" data-feather='instagram'></i></a>
                      </div>

                      <div className="twitter">
                        <a href="https://twitter.com/i/flow/login"><i class="mr-1 text-light" data-feather='twitter'></i></a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </section>
        </div>
      </div>
    </div>

    // <section id="card-demo-example">
    //   <div class="row match-height">
    //     <div class="col-md-6 col-lg-4">
    //       <div class="card">
    //         <img class="card-img-top" src="./app-assets/images/slider/04.jpg" alt="Card image cap" />
    //         <div class="card-body">
    //           <h4 class="card-title">Card title</h4>
    //           <p class="card-text">
    //             Some quick example text to build on the card title and make up the bulk of the card's content.
    //           </p>
    //           <a href="javascript:void(0)" class="btn btn-outline-primary">Go somewhere</a>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </section>
  )

};

