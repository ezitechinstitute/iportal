import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AdminTopbar } from "./AdminTopbar";

// Media
import Logo from "../../assets/AdminAssets/logo.png";

export const AdminSidebar = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <AdminTopbar handle={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span>
              <img src={Logo} alt="" width={135} />
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
