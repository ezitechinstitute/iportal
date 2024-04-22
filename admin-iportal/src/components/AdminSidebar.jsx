import React from "react";

export const AdminSidebar = () => {
  return (
    <>
      {/* BEGIN: Main Menu */}
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href="/">
                <span className="brand-logo">
                  <img src="./images/ezitech.png" alt="" />
                </span>

                <img
                  src="./images/logo.png"
                  style={{
                    width: "125px",
                    marginLeft: "10px",
                    height: "43.33px",
                  }}
                  alt="ezitech"
                />
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pr-0"
                data-toggle="collapse"
              >
                <i
                  className="d-block d-xl-none text-primary toggle-icon font-medium-4"
                  data-feather="x"
                ></i>
                <i
                  className="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary"
                  data-feather="disc"
                  data-ticon="disc"
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className="nav-item">
              <a className="d-flex align-items-center" href="index.html">
                <i data-feather="home"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  Dashboards
                </span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="dashboard-analytics.html"
              >
                <i data-feather="users"></i>

                <span className="menu-item" data-i18n="Analytics">
                  Interns
                </span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="dashboard-analytics.html"
              >
                <i data-feather="monitor"></i>

                <span className="menu-item" data-i18n="Analytics">
                  Remote Interns
                </span>
              </a>
            </li>

            <li className="nav-item active">
              <a
                className="d-flex align-items-center"
                href="dashboard-ecommerce.html"
              >
                <i data-feather="grid"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Intern Porjects
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="app-todo.html">
                <i data-feather="check-square"></i>
                <span className="menu-title text-truncate" data-i18n="Todo">
                  Intern Tasks
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="file-text"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Invoice
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-invoice-list.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="List">
                      List
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-invoice-preview.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Preview">
                      Preview
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-invoice-edit.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Edit">
                      Edit
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-invoice-add.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Add">
                      Add
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="app-calendar.html">
                <i data-feather="calendar"></i>

                <span className="menu-title text-truncate" data-i18n="Calendar">
                  Leave
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="credit-card"></i>

                <span className="menu-title text-truncate" data-i18n="Card">
                  Accounts
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="card-basic.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Basic">
                      Basic
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="card-advance.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Advance">
                      Advance
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="card-statistics.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Statistics">
                      Statistics
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="card-analytics.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Analytics">
                      Analytics
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="card-actions.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Card Actions">
                      Card Actions
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="app-kanban.html">
                <i data-feather="dollar-sign"></i>
                <span className="menu-title text-truncate" data-i18n="Kanban">
                  Withdraw
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a
                className="d-flex align-items-center"
                href="app-file-manager.html"
              >
                <i data-feather="user"></i>

                <span
                  className="menu-title text-truncate"
                  data-i18n="File Manager"
                >
                  Managers
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="life-buoy"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="eCommerce"
                >
                  Affiliates
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-ecommerce-shop.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Shop">
                      Shop
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-ecommerce-details.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Details">
                      Details
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-ecommerce-wishlist.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Wish List">
                      Wish List
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-ecommerce-checkout.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Checkout">
                      Checkout
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="info"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Knowledge Base
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-user-list.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="List">
                      List
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-user-view.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="View">
                      View
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="app-user-edit.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Edit">
                      Edit
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="code"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="Components"
                >
                  Technology
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-alerts.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Alerts">
                      Alerts
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-avatar.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Avatar">
                      Avatar
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-badges.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Badges">
                      Badges
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-breadcrumbs.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Breadcrumbs">
                      Breadcrumbs
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-buttons.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Buttons">
                      Buttons
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-carousel.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Carousel">
                      Carousel
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-collapse.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Collapse">
                      Collapse
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-divider.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Divider">
                      Divider
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-dropdowns.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Dropdowns">
                      Dropdowns
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-list-group.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="List Group">
                      List Group
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-media-objects.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item">Media Objects</span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-modals.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Modals">
                      Modals
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-navs-component.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Navs Component">
                      Navs Component
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-pagination.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Pagination">
                      Pagination
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-pill-badges.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Pill Badges">
                      Pill Badges
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-pills-component.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Pills Component">
                      Pills Component
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-popovers.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Popovers">
                      Popovers
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-progress.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Progress">
                      Progress
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-spinner.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Spinner">
                      Spinner
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-tabs-component.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Tabs Component">
                      Tabs Component
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-timeline.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Timeline">
                      Timeline
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-bs-toast.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Toasts">
                      Toasts
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="component-tooltips.html"
                  >
                    <i data-feather="circle"></i>
                    <span className="menu-item" data-i18n="Tooltips">
                      Tooltips
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="map"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="Extensions"
                >
                  Universites
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
                <i data-feather="shopping-cart"></i>
                <span className="menu-item" data-i18n="Sweet Alert">
                  Shop
                </span>
              </a>
            </li>
            <li>
              <a
                className="d-flex align-items-center"
                href="ext-component-blockui.html"
              >
                <i data-feather="shopping-bag"></i>
                <span className="menu-item" data-i18n="Block UI">
                  Purchase
                </span>
              </a>
            </li>
            <li>
              <a
                className="d-flex align-items-center"
                href="ext-component-toastr.html"
              >
                <i data-feather="settings"></i>
                <span className="menu-item" data-i18n="Toastr">
                  Setting
                </span>
              </a>
            </li>
            <li>
              <a
                className="d-flex align-items-center"
                href="ext-component-sliders.html"
              >
                <i data-feather="message-square"></i>
                <span className="menu-item" data-i18n="Sliders">
                  Feedbacks
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
