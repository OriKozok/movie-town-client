import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MovieModel from "../../../../Models/MovieModel";
import { authStore } from "../../../../Redux/AuthState";
import adminService from "../../../../Services/AdminService";
import imageService from "../../../../Services/ImageService";
import notificationService from "../../../../Services/NotificationService";
import "./MoviesCard.css";


interface MovieProps{
    movie: MovieModel;
    remove: any;
}

//This component displays a card with a movie's details given in the props
function MoviesCard(props: MovieProps): JSX.Element {

    const navigate = useNavigate();
    const user = authStore.getState().user;
    const id = props.movie.id;

    function goToScreenings(){
        navigate("/movies/"+id);
    }

    function goToUpdate(){
        navigate("/movies/update/"+id)
    }

    function deleteMovie(){
        adminService.deleteMovie(id)
        .then(message=>{
            notificationService.success(message);
            props.remove(id);
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="MoviesCard">
            <Card className="m-2 rounded" style={{ width: '250px' }}>
                <Card.Img style={{height:"250px"}} src={URL.createObjectURL(imageService.convertDataUrlToBlob(props.movie.image))} alt="Here will be the image"/>
                <Card.Title className="pt-1 fw-bold">
                    {props.movie.name}
                </Card.Title>
                <Card.Body className="pt-0">
                <Button onClick={goToScreenings} className="mb-1 btn-not-seat" style={{width:"170px"}}>Details & Screenings</Button>
                {user && user.type.toString() == "ADMINISTRATOR" && 
                <Row>
                <Col className="text-end">
                <Button className="btn-not-seat" onClick={goToUpdate}>Update</Button>
                </Col>
                <Col className="text-start">
                <Button className="btn-not-seat" onClick={deleteMovie} style={{width:"73.31px"}}>Delete</Button>
                </Col>
                </Row>}
                </Card.Body>
            </Card>
        </div>
    );
}

export default MoviesCard;
