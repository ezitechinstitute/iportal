import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
  className="footer footer-static footer-light"
  style={{
    position: "fixed",
    bottom: 0,
    width: "75%",
    padding: "10px 0", // Adjust padding as needed
    backgroundColor: "#f8f9fa", // Add a background color for better visibility
    zIndex: 1000, // Ensure the footer stays above other content
  }}
>
  <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
    <br />
    <span className="mt-25">
      COPYRIGHT © 2016-{currentYear}
      <a
        className="ml-25"
        href="https://ezitech.org/html-css-internship-opportunities/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ezitech Institute
      </a>
      <span className="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>
    <span className="float-md-right d-none d-md-block">
      <a href="https://www.facebook.com/" style={{ color: "#75727f" }}>
        <FaFacebookF size={16} className="mr-1" />
      </a>
      <a href="https://www.instagram.com/">
        <FaInstagram size={16} className="mr-1" style={{ marginLeft: "15px" }} />
      </a>
      <a href="https://www.linkedin.com/">
        <FaLinkedin size={16} className="mr-1" style={{ marginLeft: "15px" }} />
      </a>
      <a href="https://twitter.com/i/flow/login">
        <FaYoutube size={16} className="mr-1" style={{ marginLeft: "15px" }} />
      </a>
    </span>
  </p>
</footer>
  );
};
