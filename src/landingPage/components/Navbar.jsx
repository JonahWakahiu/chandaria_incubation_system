import { Nav, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../styles/landingPage.css'
function NavigationBar() {
    return (
        <>
            <Navbar expand="lg" id='navigationBar' className="sticky-top navbar-dark">
                <Container>
                    <Navbar.Brand href="#" className='d-flex align-items-center'>
                        <img
                            src='/img/background01.png'
                            alt='ku logo'
                            width="50"
                            height="50"
                            className='d-inline-block align-top'
                        />
                        <div className='d-inline-block align-middle text-white ms-2'>
                            <span className='d-block fw-bold'>Chandaria Incubate</span>
                            <span className='d-block fw-bold'>Management System</span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-links" />
                    <Navbar.Collapse id="navbar-links">
                        <Nav className='ms-auto'>
                            <Link to="/" className='nav-links'>Home</Link>
                            <Link to="login" className='nav-links'>Login</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar;