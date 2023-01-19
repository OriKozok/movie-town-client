import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MovieModel from "../../../../Models/MovieModel";
import ScreeningsCreds from "../../../../Models/ScreeningsCreds";
import MyClass from "../../../../Models/ScreeningsCreds";
import ScreeningModel from "../../../../Models/ScreeningModel";
import clientService from "../../../../Services/ClientService";
import notificationService from "../../../../Services/NotificationService";
import "./MoviesDetails.css";
import MoviesDetailsCard from "./MoviesDetailsCard/MoviesDetailsCard";

//This component display a card with a movie's details and a form to select the screening's city, date and time 
function MoviesDetails(): JSX.Element {
    const { register, handleSubmit } = useForm<MyClass>();
    const [screenings, setScreenings] = useState<ScreeningModel[]>([]);//represents all the screenings of that movie
    const [cities, setCities] = useState<string[]>([]); //represents all the cities that have screenings of that movie
    const [dates, setDates] = useState<Date[]>();//represents all the dates that have screenings of that movie
    const [movie, setMovie ] = useState<MovieModel>();
    const [times, setTimes] = useState<Date[]>();//represents all the times (hours and minutes) that have screenings of that movie
    const params = useParams();
    const id = +params.id!;
    const navigate = useNavigate();
    var prev= "";

    useEffect(()=>{
        clientService.getScreeningsByMovieId(id)
        .then(screenings=>{
            setScreenings(screenings);
            getCities(screenings);    
        })
        .catch(err=>notificationService.error(err));
    }
    ,[movie])

    useEffect(()=>{
        clientService.getMovieById(id)
        .then(movie=> setMovie(movie))
        .catch(err=> notificationService.error(err));
    }, [])

    function getCities(screenings: ScreeningModel[]){//this function receives a screenings list and create a list of all the cities that have screenings from the given list
        var sCities = screenings.map(s=> s.cinema.city);
        var citiesSet = new Set(sCities);
        setCities(Array.from(citiesSet.values()));
    }

    function selectDate(){//this functuon runs after selecting a city, filter the screenings by the city and creates select options with the screening's dates
        var citySelect = document.getElementById("cities") as HTMLSelectElement;
        var city = citySelect.value;
        setDates(screenings.filter(s=> s.cinema.city == city).map(s => new Date(s.time)));//filter the screenings by city and create a list from the screening's dates

        var datesSelect = document.getElementById("dates") as HTMLSelectElement;
        if(datesSelect.value != ""){//If true, it means the user is changing the city after browsing through the dates, therefore the time select must be disabled
            datesSelect.value = "";
            var timesSelect = document.getElementById("times") as HTMLSelectElement;
            timesSelect.setAttribute("disabled", "disabled");
            timesSelect.value = "";
        }else{//If false, enable the date select
            datesSelect.removeAttribute("disabled");
        }
    }

    function selectTime(){//this function runs after selecting a date, filter the dates by the selected one and create select options of the dates' times (hours and minutes)
        var dateSelect = document.getElementById("dates") as HTMLSelectElement;
        var date = new Date(dateSelect.value);
        setTimes(dates.filter(d => d.toDateString() === date.toDateString()));
        var timeSelect = document.getElementById("times") as HTMLSelectElement;

        timeSelect.removeAttribute("disabled");
        if(prev = ""){//If true, it means the user is changing the date after browsing through them, therefore the times' placeholder should be selected
            prev = dateSelect.value;
        }
        else//If false, it means the user selected a date for the first time, therefore the time select must be enabled
            timeSelect.value = "";
    }

    function enableButton(){
        var button = document.getElementById("submitB") as HTMLSelectElement;
        button.removeAttribute("disabled");
    }

    function message(model : ScreeningsCreds){//this function receives screening creds and attempts to find a screening with those creds. If there is one, navigate to its seats page
        var screening = screenings.find(s => {
            var sDate = new Date(s.time);
            return s.cinema.city == model.city && sDate.toDateString() == model.date &&
        (sDate.getHours()+":"+sDate.getMinutes()) == model.time});
        if(screening)
        {
            navigate("/screening/"+screening.id+"/seats");
        }
        else{
            notificationService.error("Something went wrong, try again")
        }    
    }

    return (
        <div className="MoviesDetails">
            <MoviesDetailsCard movie={movie}/>

            <Container className="d-flex justify-content-center pt-3">
            {screenings?.length != 0 ?
            <Form onSubmit={handleSubmit(message)} style={{width:"288px"}}> 
                <Form.Group controlId="formCity">
                    <Form.Label className="fw-bold">City:</Form.Label>
                    <Form.Select {...register("city")} id="cities" defaultValue="" onChange={selectDate} required>
                        <option value="" disabled hidden>Choose City</option>
                        {cities?.map(city=> <option value={city} key={city}>{city}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="pt-3" controlId="formDate">
                    <Form.Label className="fw-bold">Date:</Form.Label>
                    <Form.Select {...register("date")} id="dates" defaultValue="" disabled onChange={selectTime} required>
                        <option value="" disabled hidden>Choose Date</option>
                        {dates?.map(date=> <option value={date.toDateString()} key={date.toDateString()}>{date.toDateString()}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="pt-3" controlId="formTime">
                    <Form.Label className="fw-bold">Time:</Form.Label>
                    <Form.Select {...register("time")} id="times" defaultValue="" disabled onChange={enableButton} required>
                        <option value="" disabled hidden>Choose Time</option>
                        {times?.map(time=> <option value={time.getHours()+":"+time.getMinutes()} key={time.getHours()+":"+time.getMinutes()}>{time.getHours()+":"+(time.getMinutes() == 0 ? "00" : time.getMinutes())}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button className="mt-3 btn-not-seat" type="submit" disabled id="submitB">Submit</Button>
            </Form>
            : <Card className="p-2">No screenings for this movie!</Card>}</Container>
            <Button className="btn-not-seat mt-2" href="/movies">Back</Button>
        </div>
    );
}

export default MoviesDetails;
