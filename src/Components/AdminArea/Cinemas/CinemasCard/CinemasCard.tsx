import { Button, Card } from "react-bootstrap";
import CinemaModel from "../../../../Models/CinemaModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CinemasCard.css";

interface cinemaProps{
    cinema: CinemaModel;
    remove: any;
}

//This component displays a card with a cinema's details that were given in the props
function CinemasCard(props: cinemaProps): JSX.Element {

    var id = props.cinema.id;

    function deleteCinema(){
        adminService.deleteCinema(id)
        .then(message=> {
            notificationService.success(message);
            props.remove(id, props.cinema.city);
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="CinemasCard">
			<Card className="m-2 rounded" style={{ width: '250px' }}>
                <Card.Body>
                <Card.Text><span className="fw-bold">Id: </span>{id}</Card.Text>
                <Card.Text><span className="fw-bold">City: </span>{props.cinema.city}</Card.Text>
                <Card.Text><span className="fw-bold">Hall id: </span>{props.cinema.hallId}</Card.Text>
                <Card.Text><span className="fw-bold">Number of rows: </span>{props.cinema.numOfRows}</Card.Text>
                <Card.Text><span className="fw-bold">Number of columns: </span>{props.cinema.numOfColumns}</Card.Text>
                <Button className="btn-not-seat" onClick={deleteCinema}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CinemasCard;
