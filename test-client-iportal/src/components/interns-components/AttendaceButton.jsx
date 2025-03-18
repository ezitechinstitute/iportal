import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AttendaceButton = () => {
  const [active, setActive] = useState("attedance");

  return (
    <>
      <Link
        type="button"
        className={active === "attedance" ? "btn btn-primary" : "btn btn-light"}
        to={"/internAttendence"}
        onClick={() => setActive("attedance")}
        style={{
          marginBottom: "30px",
        }}
      >
        Attendance
      </Link>
      &nbsp;
      <Link
        type="button"
        className={active === "leave" ? "btn btn-primary" : "btn btn-light"}
        to={"/intern-Leave"}
        onClick={() => setActive("leave")}
        style={{
          marginBottom: "30px",
        }}
      >
        Leave
      </Link>
    </>
  );
};
