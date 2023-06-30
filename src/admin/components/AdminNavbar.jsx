import { Link, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { sidebarData } from "./SidebarData";
import "./Navbar.css";

function AdminNavbar() {
  const [sidebar, setSidebar] = useState(true);
  const [notification, setNotification] = useState(0);

  // send an fetch Api request to get the result with pending .. status
  useEffect(() => {
    async function getNewRegistration() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/notification.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const reading = responseData.data;
        setNotification(reading);
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getNewRegistration();

    const interval = setInterval(() => {
      getNewRegistration();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  function showSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg p-0 m-0 bg-light sticky-top border-bottom">
        <div className="container-fluid">
          <Link to="#" id="sidebar-Toggler" className="mb-3">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to="/admin" className="navbar-brand">
            <img src="/img/kulogo.png" width={50} height={44} alt="kulogo" />
            <div className="d-inline-block align-middle ms-2">
              <span className="d-block fw-bold main-header">
                Chandaria Incubation
              </span>
              <span className="d-block fw-bold main-header">
                Management System
              </span>
            </div>
          </Link>

          <div className=" ms-auto me-4 notification-profile">
            <Link
              to="/admin/registration"
              className="bi bi-bell position-relative me-3"
            >
              <span className=" translate-middle badge bg-danger">
                {notification}
              </span>
            </Link>
            <Link to="#" className="bi bi-person-circle"></Link>
          </div>
        </div>
      </nav>
      <div>
        <ul className={sidebar ? "nav-menu-active" : "nav-menu"} id="sidebar">
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span className="icons">{item.icons}</span>
                  <span className="title">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={
          sidebar ? "content-sidebar-active" : "content-sidebar-inactive"
        }
        id="main-content"
      >
        <Outlet />
      </div>
    </>
  );
}
export default AdminNavbar;
