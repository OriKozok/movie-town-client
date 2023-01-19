import { SetStateAction, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Genre from "../../../../Models/Genre";
import MovieModel from "../../../../Models/MovieModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddMovie.css";

//This function displays a form of a new movie that will be sent to the server
function AddMovie(): JSX.Element {

    const {register, handleSubmit} = useForm<MovieModel>();
    const navigate = useNavigate();
    const genres = (Object.keys(Genre) as (keyof typeof Genre)[]).filter(value=> isNaN(Number(value)) === true);//Filtering the Genre enum so it will display 
                                                                                                                //only the strings and not the numbers of the enum                                                                                                       

    function send(movie: MovieModel){
        alert(movie.description.length);
        if(movie.description.length < 255){
        adminService.addMovie(movie)
        .then(()=>{
            notificationService.success("Movie added");
            navigate("/movies");
        })
        .catch(err=>notificationService.error(err));
        }else{
            notificationService.error("Description is longer than 255 chars")
        }
    }

    return (
        <div className="AddMovie">
            <h2 className="fw-bold">Add Movie</h2>
            <Container className="d-flex justify-content-center">
			<Form onSubmit={handleSubmit(send)}>
                <Form.Group controlId="formName">
                    <Form.Label className="fw-bold">Name:</Form.Label>
                    <Form.Control placeholder="Enter name" maxLength={255} {...register("name")} required/>
                </Form.Group>
                <Form.Group controlId="formGenre" className="pt-3">
                    <Form.Label className="fw-bold">Genre:</Form.Label>
                    <Form.Select {...register("genre")} defaultValue="" required>
                        <option value="" disabled hidden>Select a Genre</option>
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
                    <Form.Control type="file" {...register("image")} required/>
                </Form.Group>
                <Button type="submit" className="mt-3 btn-not-seat">Add Movie</Button>
            </Form>
            </Container>
            <Button href="/movies" className="mt-3 btn-not-seat">Back</Button>
            
        </div>
    );
}

export default AddMovie;
