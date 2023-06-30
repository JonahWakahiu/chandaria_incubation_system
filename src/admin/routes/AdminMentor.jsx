import React from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

function AdminMentor() {
  return (
    <nav className="navbar bg-light border-bottom">
      <Link to="#" className="ms-auto me-3">
        <button className="btn btn-sm" id="addPatentBtn">
          add Mentor
        </button>
      </Link>
    </nav>
  );
}

export default AdminMentor;
