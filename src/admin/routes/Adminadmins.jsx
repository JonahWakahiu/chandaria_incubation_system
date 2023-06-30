import React from "react";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";

function Adminadmins() {
  return (
    <nav className="navbar bg-light border-bottom">
      <Link to="#" className="ms-auto me-3">
        <button className="btn btn-success">
          <BiIcons.BiPlus />
          add Admin
        </button>
      </Link>
    </nav>
  );
}

export default Adminadmins;
