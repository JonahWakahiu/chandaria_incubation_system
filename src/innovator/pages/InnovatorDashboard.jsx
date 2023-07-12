import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import Avatar from "@mui/material/Avatar";

import "react-circular-progressbar/dist/styles.css";

const percentage = 66;
function InnovatorDashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-4 col-lg-2 border rounded shadow me-2"
          style={{ height: "150px" }}
        >
          <h6>Mentor</h6>
          <Avatar alt="user13" src="/img/user13.jpg" />
          John Doe <br />
          <a className="mb-0" href="">
            Profile
          </a>
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded shadow me-2 bg-danger"
          style={{ height: "150px" }}
        >
          <h6>Progress</h6>
        </div>
        <div
          className="col-md-4 col-lg-2 border rounded me-2 shadow"
          style={{ height: "150px", overflow: "hidden" }}
        >
          <div className="h-100"></div>
        </div>
      </div>
    </div>
  );
}

export default InnovatorDashboard;
