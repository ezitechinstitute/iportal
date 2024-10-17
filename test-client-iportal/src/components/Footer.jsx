import React from "react";

export const Footer = () => {
  return (
    <>
      <footer
        class="footer footer-static footer-light"
        style={{
          padding: "0px",
          margin: "0px",
          marginTop: "60px",
        }}
      >
        <div></div>
        <p
          class="clearfix mb-0"
          style={{
            marginleft: "10px",
          }}
        >
          <span class=" mt-25">
            COPYRIGHT &copy; 2024
            <a
              class="ml-25"
              href="https://ezitech.org/html-css-internship-opportunities/"
              target="_blank"
            >
              Ezitech Institute
            </a>
            <span class="d-none d-sm-inline-block">, All rights Reserved</span>
          </span>
          <span class="float-md-right d-none d-md-block">
            <a
              href="https://www.facebook.com/"
              style={{
                color: "#75727f",
              }}
            >
              <i
                class="mr-1 "
                data-feather="facebook"
                style={{ color: "#5E5873" }}
              ></i>
            </a>

            <a href="https://www.instagram.com/">
              <i
                class="mr-1 "
                data-feather="instagram"
                style={{
                  color: "#75727f",
                  marginleft: "15px",
                  // backgroundColor:"pink"
                }}
              ></i>
            </a>

            <a href="https://www.linkedin.com/">
              <i
                class="mr-1 "
                data-feather="linkedin"
                style={{
                  color: "#75727f",
                  marginleft: "15px",
                  // backgroundColor:"pink"
                }}
              ></i>
            </a>

            <a href="https://twitter.com/i/flow/login">
              <i
                class="mr-1 "
                data-feather="youtube"
                style={{
                  color: "#75727f",
                  marginleft: "15px",
                  // backgroundColor:"pink"
                }}
              ></i>
            </a>
          </span>
        </p>
      </footer>
    </>
  );
};
