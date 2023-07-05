import "../styles/landingPage.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { type } from '@testing-library/user-event/dist/type';

function LandingPageHome(props) {
  return (
    <div className="bg-light">
      <Container id="landingBody" className="d-flex align-items-center">
        <Row className="d-flex justify-content-center text-secondary">
          <Col md={6}>
            <img
              src="/img/background1.jpg"
              className="img-fluid"
              alt="background"
            />
          </Col>
          <Col md={6}>
            <h6 className="mt-4 mb-5">Welcome To</h6>
            <div className="my-3">
              <span className="d-block fw-bold display-6 main-heading">
                Chandaria Incubate
              </span>
              <span className="d-block fw-bold display-6 main-heading">
                Management System
              </span>
            </div>

            <h6>The home of Innovation</h6>

            <Link
              className="btn rounded-pill my-3"
              id="registerBtn"
              to="registration"
            >
              Register
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPageHome;
