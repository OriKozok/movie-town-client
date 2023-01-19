import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, Row, ToggleButton } from "react-bootstrap";
import ScreeningModel from "../../../Models/ScreeningModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import ScreeningCard from "./ScreeningCard/ScreeningCard";
import "./Screenings.css";

//This component displays all the screenings in the DB by city or by movie
function Screenings(): JSX.Element {

    const [screenings, setScreenings] = useState<ScreeningModel[]>();
    const [cities, setCities] = useState<string[]>();
    const [movies, setMovies] = useState<string[]>();
    const [showByMovies, setShowByMovies] = useState<boolean>(false);//if false, screenings will be shown by city, and if true, they'll be shown by movie

    const remove = (id:number, Smovie:string, Scity:string) => {//This function removes the selected screening from display
        if(screenings.filter(scr=> scr.cinema.city == Scity).length == 1){//if the only screening in that city is removed, remove the title of screenings in that city
            setCities(self => self.filter(city=> city != Scity));}
        if(screenings.filter(scr=> scr.movie.name == Smovie).length == 1)//if the only screening of that movie is removed, remove the title of screenings of that movie
            setMovies(self => self.filter(movie=> movie != Smovie));
        setScreenings(screenings.filter(screening=> screening.id != id));    
    }

    useEffect(()=>{   
        adminService.getAllScreenings()
        .then(screenings=> {
            setScreenings(screenings);
            getCities(screenings);
            getMovies(screenings);
        })
        .catch(err=> notificationService.error(err));
        }, [])

    function getCities(screenings: ScreeningModel[]){//This function receives a list of screenings and create a list of cities that have screenings screened in them
        var sCities = screenings.map(s=> s.cinema.city);
        var citiesSet = new Set(sCities);
        setCities(Array.from(citiesSet.values()));
    }

    function getMovies(screenings: ScreeningModel[]){//This function receives a list of screenings and create a list of movies that are screened
        var movies = screenings.map(s=> s.movie.name);
        var moviesSet = new Set(movies);
        setMovies(Array.from(moviesSet.values()));
    }

    function setToShowByCities(){
        setShowByMovies(false);
    }

    function setToShowByMovies(){
        setShowByMovies(true);
    }

    return (
        <div className="Screenings">
            <h2 className="fw-bold">Screenings</h2>
            <Button className="mt-2 btn-not-seat" href="/screenings/add">Add Screening</Button><div></div>
            <ButtonGroup className="mt-3 border">
                <ToggleButton className="btn-not-seat" id="citiesB" value={"showByCities"} onClick={setToShowByCities}>Show By Cities</ToggleButton>
                <ToggleButton className="btn-not-seat" id="moviesB" value={"showByMovies"} onClick={setToShowByMovies}>Show By Movies</ToggleButton>
            </ButtonGroup>
            <Container fluid>

			{screenings && cities && !showByMovies &&//ShowByMovies is false, therefore display the screenings by city
                cities.map(city=> <>
                    <h3 className="pt-2" key={city}>{city}</h3>
                    <Row className="d-flex justify-content-center pb-3">
                    {screenings.filter(scr=> scr.cinema.city == city).map(screening=><Col className="d-flex justify-content-center" xs='12' md='6' lg='2'><ScreeningCard screening={screening} showByMovies={showByMovies} remove={remove} key={screening.id}/></Col>)}
                    </Row></>)
            }

            {screenings && movies && showByMovies &&//ShowByMovies is true, therefore display the screenings by movie
                movies.map(movie=> <>
                    <h3 className="pt-2" key={movie}>{movie}</h3>
                    <Row className="d-flex justify-content-center pb-3">
                    {screenings.filter(scr=> scr.movie.name == movie).map(screening=><Col className="d-flex justify-content-center" xs='12' md='6' lg='2'><ScreeningCard screening={screening} showByMovies={showByMovies} remove={remove} key={screening.id}/></Col>)}
                    </Row></>)
            }</Container>
            
            {screenings?.length == 0 && <Card className="p-2">No Screenings</Card>}
        </div>
    );
}

export default Screenings;
