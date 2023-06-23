import { Form, Container, Row, Col, InputGroup, Card } from 'react-bootstrap'
import '../Styles/LoginPage.css';

function LoginPage() {
    return (
        <Container className='login-wrapper bg-light-subtle vh-100 d-flex justify-content-center align-items-center'>
            <Row className='d-flex align-items-stretch justify-content-center border p-2 rounded'>
                <Col md={5} >
                    <Card className='d-flex align-items-stretch'>
                        <Card.Body>
                            <Card.Title>Hello, Friend</Card.Title>
                            <Card.Subtitle>Make a Dream Come True</Card.Subtitle>
                            <Card.Text>Enter your personal details and start journey with us</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5}>
                    <Form className='border'>
                        <Row className='mb-3'>
                            <h1 className='text-center mt-3'>Welcome !</h1>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
                                <Form.Control id='email' type='text' />
                            </InputGroup>
                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text><i className="bi bi-unlock"></i></InputGroup.Text>
                                <Form.Control id='password' type='text' />
                            </InputGroup>
                            <Form.Group>
                                <a to="/">Forgot Password?</a>
                                <button className='btn btn-success ms-auto'>Login</button>
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;