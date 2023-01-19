import { Card, Container, Row } from "react-bootstrap";
import MovieModel from "../../../../../Models/MovieModel";
import imageService from "../../../../../Services/ImageService";
import "./MoviesDetailsCard.css";

interface movieProps{
    movie: MovieModel
}

function MoviesDetailsCard(props: movieProps): JSX.Element {

    const movie = props.movie;

    return (
        <div className="MoviesDetailsCard">
			<Container className="d-flex justify-content-center">
            {movie ?
			<Card className="rounded" style={{ width: "250px" }}>
                <Card.Img style={{height:"250px"}} src={URL.createObjectURL(imageService.convertDataUrlToBlob(movie.image))} alt="Here will be the picture"/>
                <Card.Title className="fw-bold">{movie.name}</Card.Title>
                <Card.Body className="pt-0 ps-0 pe-0">
                    <Card.Text className="pt-1 ms-2 me-2 overflow-auto">{movie.description}</Card.Text>
                    <Card.Text><span className="fw-bold">Genre: </span>{movie.genre.toString().charAt(0) + movie.genre.toString().slice(1).toLowerCase()}</Card.Text>
                    <Card.Text><span className="fw-bold">Duration: </span>{movie.duration} minutes</Card.Text>
                </Card.Body>
            </Card> : 
            <Card>No such movie!</Card>}
            </Container>
        </div>
    );
}

export default MoviesDetailsCard;
