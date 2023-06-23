import '../Styles/Footer.css'
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {
    return (
        <div className='mt-2 footer'>
            <Container>
                <Row>
                    <Col>
                        <small>&copy; 2023</small> <small className="border-start ps-1">Chandaria Business Innovation & Incubation Centre Kenyatta University</small>
                    </Col>
                    <Col className="d-inline-block">
                    <i className="bi bi-facebook me-2"></i>
                    <i className="bi bi-twitter me-2"></i>
                    <i className="bi bi-linkedin me-2"></i>
                    <i className="bi bi-instagram "></i>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Footer;