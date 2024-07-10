import React from "react";

export const Information = () => {
  return (
    <>
      <div class="content-body">
        {/* <!-- search header --> */}
        <section id="faq-search-filter">
          <div class="card faq-search bg-information">
            <div class="card-body text-center">
              {/* <!-- main title --> */}
              <h1 class="text-primary">
                THERE ARE SOME STEPS OF YOUR INTERVIEW PROCESS
              </h1>
              <h1 class="text-primary">PLEASE READ CAREFULLY!</h1>
            </div>
          </div>
        </section>
        {/* <!-- frequently asked questions tabs pills --> */}
        <section id="faq-tabs">
          {/* <!-- vertical tab pill --> */}
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-12">
              <div class="faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0">
                {/* <!-- pill tabs navigation --> */}

                {/* <!-- FAQ image --> */}
                <img
                  src="../../../app-assets/images/illustration/faq-illustrations.svg"
                  class="img-fluid d-none d-md-block"
                  alt="demand img"
                />
              </div>
            </div>

            <div class="col-lg-9 col-md-8 col-sm-12">
              {/* <!-- pill tabs tab content --> */}
              <div class="tab-content">
                {/* <!-- payment panel --> */}
                <div
                  role="tabpanel"
                  class="tab-pane active"
                  id="faq-payment"
                  aria-labelledby="payment"
                  aria-expanded="true"
                >
                  {/* <!-- icon and header --> */}
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-tag bg-light-primary mr-1">
                      <i
                        data-feather="chevrons-right"
                        class="font-medium-4"
                      ></i>
                    </div>
                    <div>
                      <h4 class="mb-0">Interview Process Details</h4>
                      {/* <span>How I can confirm my registration?</span> */}
                    </div>
                  </div>

                  {/* <!-- frequent answer and question  collapse  --> */}
                  <div
                    class="collapse-margin collapse-icon mt-2"
                    id="faq-payment-qna"
                  >
                    <div class="card">
                      <div
                        class="card-header"
                        id="paymentOne"
                        role="button"
                        // data-target="#faq-payment-one"
                        aria-expanded="false"
                        aria-controls="faq-payment-one"
                      >
                        <span class="lead collapse-title">
                          You have received a confirmation message on your
                          WhatsApp with in 30 seconds. Please check it to
                          proceed with the verification.
                        </span>
                      </div>
                    </div>

                    <div
                      class="collapse-margin collapse-icon mt-2"
                      id="faq-delivery-qna"
                    >
                      <div class="card">
                        <div
                          class="card-header"
                          id="deliveryOne"
                          role="button"
                          data-target="#faq-delivery-one"
                          aria-expanded="false"
                          aria-controls="faq-delivery-one"
                        >
                          <span class="lead collapse-title">
                            The number that sent you the confirmation message is
                            your assigned manager.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      class="collapse-margin collapse-icon mt-2"
                      id="faq-delivery-qna"
                    >
                      <div class="card">
                        <div
                          class="card-header"
                          id="deliveryOne"
                          role="button"
                          data-target="#faq-delivery-one"
                          aria-expanded="false"
                          aria-controls="faq-delivery-one"
                        >
                          <span class="lead collapse-title">
                            They will conduct your interview and guide you
                            through the remaining process.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      class="collapse-margin collapse-icon mt-2"
                      id="faq-delivery-qna"
                    >
                      <div class="card">
                        <div
                          class="card-header"
                          id="cancellationOne"
                          role="button"
                          data-target="#faq-cancellation-one"
                          aria-expanded="false"
                          aria-controls="faq-cancellation-one"
                        >
                          <span class="lead collapse-title">
                            If the manager does not respond within 24 hours, you
                            are required to send a reminder message to them.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- delivery panel --> */}
                <div
                  class="tab-pane"
                  id="faq-delivery"
                  role="tabpanel"
                  aria-labelledby="delivery"
                  aria-expanded="false"
                >
                  {/* <!-- icon and header --> */}
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-tag bg-light-primary mr-1">
                      <i data-feather="shopping-bag" class="font-medium-4"></i>
                    </div>
                    <div>
                      <h4 class="mb-0">Confirmation and Next Steps</h4>
                      <span>
                        What should I do after receiving the confirmation
                        message on WhatsApp?
                      </span>
                    </div>
                  </div>

                  {/* <!-- frequent answer and question  collapse  --> */}
                </div>

                {/* <!-- cancellation return  --> */}
                <div
                  class="tab-pane"
                  id="faq-cancellation-return"
                  role="tabpanel"
                  aria-labelledby="cancellation-return"
                  aria-expanded="false"
                >
                  {/* <!-- icon and header --> */}
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-tag bg-light-primary mr-1">
                      <i data-feather="refresh-cw" class="font-medium-4"></i>
                    </div>
                    <div>
                      <h4 class="mb-0">Follow-Up Procedure</h4>
                      <span>
                        What should I do if the manager does not respond within
                        24 hours?
                      </span>
                    </div>
                  </div>

                  {/* <!-- frequent answer and question  collapse  --> */}
                  <div
                    class="collapse-margin collapse-icon mt-2"
                    id="faq-cancellation-qna"
                  >
                    <div class="card">
                      <div
                        class="card-header"
                        id="cancellationOne"
                        data-toggle="collapse"
                        role="button"
                        data-target="#faq-cancellation-one"
                        aria-expanded="false"
                        aria-controls="faq-cancellation-one"
                      >
                        <span class="lead collapse-title">
                          If the manager does not respond within 24 hours, you
                          are required to send a reminder message to them.
                        </span>
                      </div>
                    </div>
                    <div class="card">
                      <div
                        class="card-header"
                        id="cancellationTwo"
                        data-toggle="collapse"
                        role="button"
                        data-target="#faq-cancellation-two"
                        aria-expanded="false"
                        aria-controls="faq-cancellation-two"
                      >
                        <span class="lead collapse-title">
                          How can I get the contact number of my delivery agent?
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- / frequently asked questions tabs pills --> */}

        {/* <!-- contact us --> */}
        <section class="faq-contact">
          <div class="row mt-5 pt-75">
            <div class="col-12 text-center">
              <h2>You still have a question?</h2>
              <p class="mb-3">
                You can always contact us. We will answer to you shortly!
              </p>
            </div>
            <div class="col-sm-6">
              <div class="card text-center faq-contact-card shadow-none py-1">
                <div class="card-body">
                  <div class="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                    <i data-feather="phone-call" class="font-medium-3"></i>
                  </div>

                  <h4>+ (92) 345 5555396</h4>
                  <span class="text-body">We are always happy to help!</span>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card text-center faq-contact-card shadow-none py-1">
                <div class="card-body">
                  <div class="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                    <i data-feather="mail" class="font-medium-3"></i>
                  </div>
                  <h4>info@ezitech.org</h4>
                  <span class="text-body">Best way to get answer faster!</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--/ contact us --> */}
      </div>
      {/* <!-- /search header --> */}
    </>
  );
};
