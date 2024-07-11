import React from "react";
import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <>
      <div id="sidebar">
        <div class="sidebar h-100">
          <div class="sidebar-logo">
            <a href="">Manager Dashboard</a>
          </div>
          <ul class="sidebar-nav">
            <li class="sidebar-header">Manager Elements</li>
            <li class="sidebar-item">
              <Link to="/admin-dashboard" class="sidebar-link">
                <i class="fa-solid fa-house pe-2"></i>Dashboard
              </Link>
            </li>

            <li class="sidebar-item">
              <Link to="/transactions" class="sidebar-link">
                <i class="fa-solid fa-money-bill-transfer pe-2"></i>Transactions
              </Link>
            </li>

            <li class="sidebar-item">
              <Link to="/invoices" class="sidebar-link">
                <i class="fa-solid fa-receipt pe-2"></i>Invoices
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
