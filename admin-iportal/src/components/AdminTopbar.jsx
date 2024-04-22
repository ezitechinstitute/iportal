import React from "react";
import "../style/AdminStyle.css";

export const AdminTopbar = () => {
  return (
    <>
      {/* BEGIN: Header */}
      <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
        <div className="navbar-container d-flex content">
          <div className="bookmark-wrapper d-flex align-items-center">
            <ul className="nav navbar-nav d-xl-none">
              <li className="nav-item">
                <a className="nav-link menu-toggle" href="javascript:void(0);">
                  <i className="ficon" data-feather="menu"></i>
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ml-auto">
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link nav-link-style">
                <i className="ficon" data-feather="moon"></i>
              </a>
            </li>

            <li className="nav-item dropdown dropdown-notification mr-25">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <i className="ficon" data-feather="bell"></i>
                <span className="badge badge-pill badge-danger badge-up">
                  5
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                <li className="dropdown-menu-header">
                  <div className="dropdown-header d-flex">
                    <h4 className="notification-title mb-0 mr-auto">
                      Notifications
                    </h4>
                    <div className="badge badge-pill badge-light-primary">
                      6 New
                    </div>
                  </div>
                </li>
                <li className="scrollable-container media-list">
                  <a className="d-flex" href="javascript:void(0)">
                    <div className="media d-flex align-items-start">
                      <div className="media-left">
                        <div className="avatar">
                          <img
                            src="./app-assets/images/portrait/small/avatar-s-15.jpg"
                            alt="avatar"
                            width="32"
                            height="32"
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="media-heading">
                          <span className="font-weight-bolder">
                            Congratulation Sam 🎉
                          </span>
                          winner!
                        </p>
                        <small className="notification-text">
                          {" "}
                          Won the monthly best seller badge.
                        </small>
                      </div>
                    </div>
                  </a>
                  <a className="d-flex" href="javascript:void(0)">
                    <div className="media d-flex align-items-start">
                      <div className="media-left">
                        <div className="avatar">
                          <img
                            src="./app-assets/images/portrait/small/avatar-s-3.jpg"
                            alt="avatar"
                            width="32"
                            height="32"
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="media-heading">
                          <span className="font-weight-bolder">
                            New message
                          </span>
                          &nbsp;received
                        </p>
                        <small className="notification-text">
                          {" "}
                          You have 10 unread messages
                        </small>
                      </div>
                    </div>
                  </a>
                  <a className="d-flex" href="javascript:void(0)">
                    <div className="media d-flex align-items-start">
                      <div className="media-left">
                        <div className="avatar bg-light-danger">
                          <div className="avatar-content">MD</div>
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="media-heading">
                          <span className="font-weight-bolder">
                            Revised Order 👋
                          </span>
                          &nbsp;checkout
                        </p>
                        <small className="notification-text">
                          {" "}
                          MD Inc. order updated
                        </small>
                      </div>
                    </div>
                  </a>
                  <div className="media d-flex align-items-center">
                    <h6 className="font-weight-bolder mr-auto mb-0">
                      System Notifications
                    </h6>
                    <div className="custom-control custom-control-primary custom-switch">
                      <input
                        className="custom-control-input"
                        id="systemNotification"
                        type="checkbox"
                        checked=""
                      />
                      <label
                        className="custom-control-label"
                        for="systemNotification"
                      ></label>
                    </div>
                  </div>
                  <a className="d-flex" href="javascript:void(0)">
                    <div className="media d-flex align-items-start">
                      <div className="media-left">
                        <div className="avatar bg-light-danger">
                          <div className="avatar-content">
                            <i className="avatar-icon" data-feather="x"></i>
                          </div>
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="media-heading">
                          <span className="font-weight-bolder">
                            Server down
                          </span>
                          &nbsp;registered
                        </p>
                        <small className="notification-text">
                          {" "}
                          USA Server is down due to hight CPU usage
                        </small>
                      </div>
                    </div>
                  </a>
                  <a className="d-flex" href="javascript:void(0)">
                    <div className="media d-flex align-items-start">
                      <div className="media-left">
                        <div className="avatar bg-light-success">
                          <div className="avatar-content">
                            <i className="avatar-icon" data-feather="check"></i>
                          </div>
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="media-heading">
                          <span className="font-weight-bolder">
                            Sales report
                          </span>
                          &nbsp;generated
                        </p>
                        <small className="notification-text">
                          {" "}
                          Last month sales report generated
                        </small>
                      </div>
                    </div>
                  </a>
                  <a className="d-flex" href="javascript:void(0)">
                    <div className="media d-flex align-items-start">
                      <div className="media-left">
                        <div className="avatar bg-light-warning">
                          <div className="avatar-content">
                            <i
                              className="avatar-icon"
                              data-feather="alert-triangle"
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="media-heading">
                          <span className="font-weight-bolder">
                            High memory
                          </span>
                          &nbsp;usage
                        </p>
                        <small className="notification-text">
                          {" "}
                          BLR Server using high memory
                        </small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="dropdown-menu-footer">
                  <a
                    className="btn btn-primary btn-block"
                    href="javascript:void(0)"
                  >
                    Read all notifications
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle dropdown-user-link"
                id="dropdown-user"
                href="javascript:void(0);"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name font-weight-bolder">John Doe</span>
                  <span className="user-status">Admin</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src="./app-assets/images/portrait/small/avatar-s-11.jpg"
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                  <span className="avatar-status-online"></span>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-user"
              >
                <a className="dropdown-item" href="page-profile.html">
                  <i className="mr-50" data-feather="user"></i> Profile
                </a>
                <a className="dropdown-item" href="app-email.html">
                  <i className="mr-50" data-feather="mail"></i> Inbox
                </a>
                <a className="dropdown-item" href="app-todo.html">
                  <i className="mr-50" data-feather="check-square"></i> Task
                </a>
                <a className="dropdown-item" href="app-chat.html">
                  <i className="mr-50" data-feather="message-square"></i> Chats
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="page-account-settings.html">
                  <i className="mr-50" data-feather="settings"></i> Settings
                </a>
                <a className="dropdown-item" href="page-pricing.html">
                  <i className="mr-50" data-feather="credit-card"></i> Pricing
                </a>
                <a className="dropdown-item" href="page-faq.html">
                  <i className="mr-50" data-feather="help-circle"></i> FAQ
                </a>
                <a className="dropdown-item" href="page-auth-login-v2.html">
                  <i className="mr-50" data-feather="power"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="main-search-list-defaultlist d-none">
        <li className="d-flex align-items-center">
          <a href="javascript:void(0);">
            <h6 className="section-label mt-75 mb-0">Files</h6>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/xls.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Two new item submitted</p>
                <small className="text-muted">Marketing Manager</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;17kb
            </small>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/jpg.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">52 JPG file Generated</p>
                <small className="text-muted">FontEnd Developer</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;11kb
            </small>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/pdf.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">25 PDF File Uploaded</p>
                <small className="text-muted">Digital Marketing Manager</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;150kb
            </small>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/doc.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Anna_Strong.doc</p>
                <small className="text-muted">Web Designer</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;256kb
            </small>
          </a>
        </li>
        <li className="d-flex align-items-center">
          <a href="javascript:void(0);">
            <h6 className="section-label mt-75 mb-0">Members</h6>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-8.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">John Doe</p>
                <small className="text-muted">UI designer</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-1.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Michal Clark</p>
                <small className="text-muted">FontEnd Developer</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-14.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Milena Gibson</p>
                <small className="text-muted">Digital Marketing Manager</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-6.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Anna Strong</p>
                <small className="text-muted">Web Designer</small>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <ul className="main-search-list-defaultlist-other-list d-none">
        <li className="auto-suggestion justify-content-between">
          <a className="d-flex align-items-center justify-content-between w-100 py-50">
            <div className="d-flex justify-content-start">
              <span className="mr-75" data-feather="alert-circle"></span>
              <span>No results found.</span>
            </div>
          </a>
        </li>
      </ul>
      {/* End Header */}
    </>
  );
};
