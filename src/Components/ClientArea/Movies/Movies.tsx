import "./Movies.css";
import {  useEffect, useState } from "react";
import MovieModel from "../../../Models/MovieModel";
import MoviesCard from "./MoviesCard/MoviesCard";
import clientService from "../../../Services/ClientService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import notificationService from "../../../Services/NotificationService";
import FilterMovies from "./FilterMovies/FilterMovies";
import { authStore } from "../../../Redux/AuthState";

//This component displays all the movies in  the DB
function Movies(): JSX.Element {

    const [allMovies, setAllMovies] = useState<MovieModel[]>();//represents the movies' list without filters
    const [movies, setMovies] = useState<MovieModel[]>(); //represents the movies' list, can be filtered by genre/city
    const user = authStore.getState().user;

    const remove = (id: number) => {//this function will delete the selected movie from display
        setMovies(movies.filter(movie=> movie.id != id));
    }

    const clear = () =>{//this function will display all the movies
        setMovies(allMovies);
    }

    const filterByCity= (city: string) =>{//this function recieves a city and will display all the movies that are screened in that city
        if(city){//the user can enter a city and then deletes it. That way, city will become null and will not be sent to the server
            clientService.getMoviesByCity(city)
        .then(movies => setMovies(movies))
        .catch(err=> notificationService.error(err));
        }
    }

    const filterByGenre= (genre: string) =>{//this function receives a genre and will display all the movies of that genre
        setMovies(allMovies.filter(movie=> movie.genre.toString() == genre));
    }

    useEffect(()=>{
        clientService.getAllMovies()
        .then(movies => {
            setMovies(movies);
            setAllMovies(movies);
        })
        .catch(err=> notificationService.error(err))
    }
    ,[])

    return (
        <div className="Movies">
            <h1 className="fw-bold">Movies</h1>
            {user && user.type.toString() == "ADMINISTRATOR" &&
            <Button className="mb-1 btn-not-seat" href="movies/add">Add Movie</Button>}
            <FilterMovies clear={clear} filterByCity={filterByCity} filterByGenre={filterByGenre}/>
            <Container fluid>
            <Row className="d-flex justify-content-center pt-3">
			{movies?.map(mov=> <Col className="d-flex justify-content-center" xs='12' md='6' lg='2'><MoviesCard movie={mov} key={mov.id} remove={remove}/></Col>)}
            {movies?.length == 0 && <Card>No movies</Card>}
            </Row></Container>
        </div>
    );
}

export default Movies;
