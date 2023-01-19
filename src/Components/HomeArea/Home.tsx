import {Col, Container, Row } from "react-bootstrap";

//This component displays the home page with description what you can do in the website
function Home(): JSX.Element {

    return (
        <div className="Home">
			<Container className="words-background words rounded">
                <Row>
                    <h2 className="fw-bold">Welcome to Movie town!</h2>
                </Row>
                <Row><div className="fw-bold">In this website, you can browse through our our movies and see the place and time they are screened!</div></Row>
                <Row className="mt-4 pb-4">
                    <Col>
                     <Row><div className="fw-bold">As an administrator you can:</div></Row>
                     <Row><div>Add, update or delete movies</div></Row>
                     <Row><div>Add or delete cinemas</div></Row>
                     <Row><div>Add, update or delete screenings</div></Row>
                     <Row><div>Browse through orders</div></Row>
                    </Col>
                    <Col>
                    <Row><div className="fw-bold">As an administrator you can:</div></Row>
                    <Row><div>Add, update or delete movies</div></Row>
                    <Row><div>Add or delete cinemas</div></Row>
                    <Row><div>Add, update or delete screenings</div></Row>
                    <Row><div>Browse through orders</div></Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
