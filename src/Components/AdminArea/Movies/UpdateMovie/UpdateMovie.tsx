import { Button, Card, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Genre from "../../../../Models/Genre";
import MovieModel from "../../../../Models/MovieModel";
import adminService from "../../../../Services/AdminService";
import "./UpdateMovie.css";
import notificationService from "../../../../Services/NotificationService";
import imageService from "../../../../Services/ImageService";

//This function displays a form of a movie that will be updated and sent to the server
function UpdateMovie(): JSX.Element {

    const {register, handleSubmit, setValue} = useForm<MovieModel>();
    const [movieServ, setMovieServ] = useState<MovieModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;
    const genres = (Object.keys(Genre) as (keyof typeof Genre)[]).filter(value=> isNaN(Number(value)) === true);//Filtering the Genre enum so it will display 
                                                                                                                //only the strings and not the numbers of the enum

    useEffect(()=>{
        adminService.getMovieById(id)
        .then(movie => {
            setValue("name", movie.name);
            setValue("genre", movie.genre);
            setValue("description", movie.description);
            setValue("duration", movie.duration);
            setMovieServ(movie);
        })
        .catch(err=>notificationService.error(err));
    }, [])

    function send(movie: MovieModel){
        movie.id = id;//The movie that were created using the form doesn't have an id

        if(!movie.image[0])//Updating an image is not required, and if it's not updated,
            movie.image = movieServ.image;//the new movie object's image will be the same as the image that was received from the server
        adminService.updateMovie(movie)
        .then(()=>{
            notificationService.success("Movie updated");
            navigate("/movies");
        })
        .catch(err=>notificationService.error(err));
    }

    function back(){
        navigate("/movies");
    }

    return (
        <div className="UpdateMovie">
            {movieServ && <Card.Img className="border rounded" style={{height:"250px", width:"250px"}} src={URL.createObjectURL(imageService.convertDataUrlToBlob(movieServ.image))} alt="Here will be the picture"/>}
			{movieServ ? <Container className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit(send)}>
                <Form.Group controlId="formName">
                    <Form.Label className="fw-bold">Name:</Form.Label>
                    <Form.Control placeholder="Enter name" maxLength={255} {...register("name")} required/>
                </Form.Group>
                <Form.Group controlId="formGenre" className="pt-3">
                    <Form.Label className="fw-bold">Genre:</Form.Label>
                    <Form.Select {...register("genre")} required>
                    {genres.map(genre=> <option key={genre} value={genre}>{genre.toString()}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formDescription" className="pt-3">
                    <Form.Label className="fw-bold">Description:</Form.Label>
                    <Form.Control  as="textarea" placeholder="Enter description" maxLength={255} {...register("description")} required/>
                </Form.Group>
                <Form.Group controlId="formDuration" className="pt-3">
                    <Form.Label className="fw-bold">Duration in minutes:</Form.Label>
                    <Form.Control type="number" placeholder="Enter duration" {...register("duration")} required/>
                </Form.Group>
                <Form.Group className="pt-3">
                    <Form.Label className="fw-bold">Image:</Form.Label>
                    <Form.Control type="file" {...register("image")}/>
                </Form.Group>
                <Button type="submit" className="mt-2 mb-2 btn-not-seat">Update</Button>
            </Form></Container>
            :<Card>No Such Movie</Card>}
            <Button className="btn-not-seat" onClick={back}>Back</Button>
        </div>
    );
}

export default UpdateMovie;
