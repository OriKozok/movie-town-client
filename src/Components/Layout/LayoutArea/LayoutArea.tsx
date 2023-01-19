import { Container, Row, Card } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./LayoutArea.css";

//This component displays all the components in a grid
function LayoutArea(): JSX.Element {
    return (
        <div className="LayoutArea">
            <Container fluid>
            <Row className="words-background">
                <Col xs={4}><Header/></Col>
                <Col><Menu/></Col>
            </Row></Container>
            <Routing/>
            <Footer/>
        </div>
    );
}

export default LayoutArea;
