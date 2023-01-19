import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ScreeningModel from "../../../../Models/ScreeningModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./ScreeningCard.css";

interface screeningProps{
    screening: ScreeningModel;
    showByMovies: boolean;
    remove: any;
}
//This component displays a card with a screening's details that were given in the props
function ScreeningCard(props: screeningProps): JSX.Element {

    const cinema = props.screening.cinema;
    const movie = props.screening.movie;
    const time = new Date(props.screening.time);
    const navigate = useNavigate();
    const timeToShow = time.toDateString()+" "+time.getHours()+":"+(time.getMinutes()<10?'0':'')+time.getMinutes();//Convert the time to a string in order to display it.
                                                                                                                   //Adds a zero to the minutes if the minutes value is 0 (will display '0' if not checked)

    function update(){
        navigate("/screenings/update/"+props.screening.id);
    }

    function deleteScreening(){
        adminService.deleteScreening(props.screening.id)
        .then(message=>{
            notificationService.success(message);
            props.remove(props.screening.id, movie.name, cinema.city);
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="ScreeningCard">
            <Card style={{width:"250px"}} className="rounded m-2">
                <Card.Body>
                    <Card.Text><span className="fw-bold">Id: </span>{props.screening.id}</Card.Text>
                    <Card.Text><span className="fw-bold">City: </span>{props.screening.cinema.city}</Card.Text>
                    <Card.Text><span className="fw-bold">Hall id: </span>{props.screening.cinema.hallId}</Card.Text>
                    <Card.Text><span className="fw-bold">Time: </span>{timeToShow}</Card.Text>
                    <Card.Text><span className="fw-bold">Duration: </span>{props.screening.movie.duration} minutes</Card.Text>
                    {time > new Date() ? <><Button className="btn-not-seat me-3" onClick={update}>Update</Button>
                    <Button className="btn-not-seat" onClick={deleteScreening}>Delete</Button></>
                    : <Card.Text>This Screening was already screened</Card.Text>}{/*Can't delete or updated a screening that was already screened */}
                </Card.Body>
            </Card>
        </div>
    );
}

export default ScreeningCard;
