import "./Cinemas.css";
import { useEffect, useState } from "react";
import CinemaModel from "../../../Models/CinemaModel";
import adminService from "../../../Services/AdminService";
import CinemasCard from "./CinemasCard/CinemasCard";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import notificationService from "../../../Services/NotificationService";

//This component displays all the cinemas in the DB by cities
function Cinemas(): JSX.Element {

    const [cinemas, setCinemas] = useState<CinemaModel[]>();
    const [cities, setCities] = useState<string[]>();

    const remove = (id: number, Cinemacity: string) => {//This function removes the selected cinema from display
        if(cinemas.filter(cinema=> cinema.city === Cinemacity).length === 1){//if the only cinema in that city is removed, remove the title of cinemas in that city
            setCities(self => self.filter(city=> city !== Cinemacity));}
        setCinemas(cinemas.filter(cinema => cinema.id !== id));
    } 

    useEffect(()=> {
        adminService.getAllCinemas()
        .then(cinemas=> {
            setCinemas(cinemas);
            getCities(cinemas);
        })
        .catch(err=> notificationService.error(err));
        }
    ,[])

    function getCities(cinemas: CinemaModel[]){//creates a list of all the cinemas' cities
        var cities = cinemas.map(cinema=> cinema.city);
        var citiesSet = new Set(cities);
        setCities(Array.from(citiesSet.values()));
    }

    return (
        <div className="Cinemas">
            <h1 className="fw-bold">Cinemas</h1>
            <Button href="/cinemas/add" className="mb-1 btn-not-seat">Add Cinema</Button>
            <Container fluid>
            {cinemas && cities &&
                cities.map(city=> <>
                    <h2 key={"title-"+city}>{city}</h2>
                    <Row key={"container-"+{city}} className="d-flex justify-content-center pb-3">
                    {cinemas.filter(c=> c.city === city).map(cinema=><Col className="d-flex justify-content-center" xs='12' md='6' lg='2'><CinemasCard cinema={cinema} remove={remove} key={cinema.id}/></Col>)}
                    </Row></>)
            }</Container>
            {cinemas?.length === 0 && <Card>No cinemas</Card>}
        </div>
    );
}

export default Cinemas;
