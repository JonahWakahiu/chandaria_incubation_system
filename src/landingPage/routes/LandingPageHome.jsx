import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import '../styles/landingPage.css'
import { Container, Row, Col, Modal } from "react-bootstrap"

// import { type } from '@testing-library/user-event/dist/type';

function LandingPageHome(props) {

    // for modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="bg-light" >
            <Container id='landingBody' className='d-flex align-items-center'>
                <Row className='d-flex justify-content-center text-secondary'>
                    <Col md={6}>
                        <img
                            src="/img/background1.jpg"
                            className="img-fluid"
                            alt='background'
                        />
                    </Col>
                    <Col md={6}>
                        <h6 className='mt-4 mb-5'>Welcome To</h6>
                        <div className='my-3'>
                            <span className="d-block fw-bold display-6 main-heading">Chandaria Incubate</span>
                            <span className="d-block fw-bold display-6 main-heading">Management System</span>
                        </div>

                        <h6>The home of Innovation</h6>

                        <button className='btn rounded-pill my-3' id='registerBtn' onClick={handleShow}>Register</button>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            {...props}
                            size='lg'
                            aria-labelledby="contained-model-title-vcenter"
                            centered

                        >
                            <Modal.Header closeButton>
                                <Modal.Title id='contained-model-title-vcenter' className='w-100 text-center'>Registration Form</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <RegistrationForm />
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default LandingPageHome;