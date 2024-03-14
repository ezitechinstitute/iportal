import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa6";
import "../../styles/AdminStyle.css";

import { FaCircleUser } from "react-icons/fa6";

export const AdminTopbar = ({ handle }) => {
  return (
    <>
      <Nav
        defaultActiveKey="/home"
        as="ul"
        className="shadow rounded-0 p-2 nav-color"
      >
        <Nav.Item as="li">
          <Button
            variant="primary"
            className="btn-color rounded-0 border-0"
            onClick={handle}
          >
            <FaBars />
          </Button>
        </Nav.Item>
        <Nav.Item as="li" className="admin-profile">
          <span>
            <span>Ezitech Institute</span>&nbsp;
            <FaCircleUser style={{ color: "#7367f0", fontSize: "xx-large" }} />
          </span>
        </Nav.Item>
      </Nav>
    </>
  );
};
