import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/Navbar.css";

function AdminDashboard() {
  const [registeredIncubate, setRegisteredIncubate] = useState(0);

  useEffect(() => {
    async function getRegisteredIncubatee() {
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
        const reading = responseData.registeredIncubate;
        setRegisteredIncubate(reading);
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getRegisteredIncubatee();

    const interval = setInterval(() => {
      getRegisteredIncubatee();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  // function showSidebar() {
  //   setSidebar(!sidebar);
  // }
  return (
    <>
      <nav className="navbar bg-light border-bottom">
        <Link to="/admin/addpatent" className="ms-auto me-3">
          <button className="btn btn-sm" id="addPatentBtn">
            add Patent
          </button>
        </Link>
      </nav>
      <div className="row ms-2 me-5 my-3 g-2">
        <div className="col-md-4">
          <Card style={{ height: "210px" }}>
            <Card.Header>Registered Incubate</Card.Header>
            <Card.Body>
              <p>Current Number of Incubates Registered</p>
              <p>{registeredIncubate}</p>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "210px" }}>
            <Card.Header>Registered Incubate</Card.Header>
            <Card.Body>Current Number of ku/Non Ku Student</Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "210px" }}>
            <Card.Header>Registered Incubate</Card.Header>
            <Card.Body>Current Number of Mentors</Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "210px" }}>
            <Card.Header>Registered Incubate</Card.Header>
            <Card.Body>Current Number of Registered Companies</Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "210px" }}>
            <Card.Header>Registered Incubate</Card.Header>
            <Card.Body>Current Number of filled patents</Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card style={{ height: "210px" }}>
            <Card.Header>Registered Incubate</Card.Header>
            <Card.Body>Current Number of Commercialized Companies</Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
