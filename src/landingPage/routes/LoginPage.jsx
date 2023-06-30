import { Container, Row, Col } from 'react-bootstrap'
import '../styles/landingPage.css';

function LoginPage() {
    return (
        <div className="bg-light">
            <Container>
                <Row className='d-flex justify-content-center align-items-center' id='login-wrapper'>
                    <Col md={5} >
                        <form action="" className="row g-3 border rounded shadow p-4 bg-light-subtle">
                            <h4 className='text-center'>Welcome Back !</h4>
                            <div>
                                <label htmlFor="email" className='form-label'>Email</label>
                                <input type="text" className='form-control' id="email" />
                            </div>
                            <div>
                                <label htmlFor="password" className='form-label'>Password</label>
                                <input type="text" className='form-control' id='password' />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-primary w-50'>Login</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage;