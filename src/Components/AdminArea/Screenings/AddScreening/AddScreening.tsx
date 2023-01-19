import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm} from "react-hook-form";
import CinemaModel from "../../../../Models/CinemaModel";
import MovieModel from "../../../../Models/MovieModel";
import adminService from "../../../../Services/AdminService";
// @ts-ignore
import TimePicker from 'react-bootstrap-time-picker';
import "./AddScreening.css";
import ScreeningModel from "../../../../Models/ScreeningModel";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import notificationService from "../../../../Services/NotificationService";

//This function displays a form of a new screening that will sent to the server
function AddScreening(): JSX.Element {

    const {register, handleSubmit} = useForm<ScreeningModel>();
    const [movies, setMovies] = useState<MovieModel[]>();
    const [cinemas, setCinemas] = useState<CinemaModel[]>();
    var today = new Date().toISOString().substring(0,10);//ISOString returns a string with a date with hours and minutes, and only year, month and day is needed
    const [time, setTime] = useState(32400);//Time Picker is converting number of seconds to a string of it in hours
    const navigate = useNavigate();

    useEffect(()=>{
        adminService.getAllMovies()
        .then(movies=> setMovies(movies))
        .catch(err=> notificationService.error(err));
    }, [])

    useEffect(()=>{
        adminService.getAllCinemas()
        .then(cinemas=> setCinemas(cinemas))
        .catch(err=> notificationService.error(err));
    }, [movies])

    function checkEnable(){//Enable the add button only after the movie and the cinema were selected
        var movieSelect = document.getElementById("formMovie") as HTMLSelectElement;
        var movie = movieSelect.value;
        var cinemaSelect = document.getElementById("formCinema") as HTMLSelectElement;
        var cinema = cinemaSelect.value;
        var addButton = document.getElementById("addB") as HTMLButtonElement;
        if(movie != "" && cinema != ""){
            addButton.removeAttribute("disabled");
        }
    }

    function add(screening: ScreeningModel){
        screening.movie = movies.filter(m=> m.name == screening.movie.name)[0];//gets the movie object from the movies list by the selected name
        screening.cinema = cinemas.filter(c=> c.id == screening.cinema.id)[0];//gets the cinema object from the cinemas list by the selected cinema's id
        screening.time = new Date(screening.time);//time is a string, so it needs to be converted to an actual date
        var hoursAndMinutes = time/3600;//the time variable is the selected time in seconds. This calculation converts the seconds to hours (minutes is the number after the decimal point)
        if(hoursAndMinutes%1 == 0){//The time is x:00
            screening.time.setHours(hoursAndMinutes);
        }else{//time is x:30
            screening.time.setHours(hoursAndMinutes-0.5)
            screening.time.setMinutes(30);
        }
    }

    function send(screening: ScreeningModel){
        flushSync(()=>{//FlushSync enable the screening object to be updated before the sending to the server. Without it, the screening will not be added properly
            add(screening);
        })
        adminService.addScreening(screening)
        .then(() => {notificationService.success("Screening added")
           navigate("/screenings");
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="AddScreening">
            <h2 className="fw-bold">Add Screening</h2>
            <Container className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit(send)}>
                <Form.Group controlId="formMovie" className="pt-3">
                    <Form.Label className="fw-bold">Movie:</Form.Label>
                    <Form.Select {...register("movie.name")} onChange={checkEnable} required>
                        <option value="" selected hidden>Select movie</option>
                        {movies?.map(movie=> <option value={movie.name} key={movie.name}>{movie.name}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formCinema" className="pt-3">
                    <Form.Label className="fw-bold">Cinema:</Form.Label>
                    <Form.Select {...register("cinema.id")} onChange={checkEnable} required>
                        <option value="" selected hidden>Select cinema</option>
                        {cinemas?.map(cinema=> <option value={cinema.id} key={cinema.city+cinema.hallId}>{cinema.city}, hall {cinema.hallId}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formDate" className="pt-3">
                    <Form.Label className="fw-bold">Date:</Form.Label>
                    <Form.Control type="date" defaultValue={today} min={today}  {...register("time")} required/>
                </Form.Group>
                <Form.Group controlId="formTime" className="pt-3">
                    <Form.Label className="fw-bold">Time:</Form.Label>
                    <TimePicker value={time} start="09:00" end="23:30" step={30} onChange={(time: any) => setTime(time)} required/>
                </Form.Group>
                <Button className="mt-3 btn-not-seat" type="submit" id="addB" disabled>Add Screening</Button>
            </Form></Container>
            <Button href="/screenings" className="mt-3 btn-not-seat">Back</Button>
        </div>
    );
}

export default AddScreening;
