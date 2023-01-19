import "./ScreeningSeats.css";
import {useState, useEffect} from "react";
import SeatModel from "../../../Models/SeatModel";
import { useNavigate, useParams } from "react-router-dom";
import userSerivce from "../../../Services/UserService";
import notificationService from "../../../Services/NotificationService";
import clientService from "../../../Services/ClientService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ScreeningSeatsCard from "./ScreeningSeatsCard/ScreeningSeatsCard";
import { authStore } from "../../../Redux/AuthState";

//This component display a table of a screening's seats and enables selection of seats and ordering them
function ScreeningSeats(): JSX.Element {

    const [exists, setExists] = useState(true);//if true, the seats will be displayed (or loading message). If not, a "no such screening card" will be displayed
    const [seats, setSeats] = useState<SeatModel[][]>();
    const params = useParams();
    const id = +params.id!;
    const user = authStore.getState().user;
    var table : SeatModel[][] = new Array<SeatModel[]>();//table is a matrix of seats. Each row represents a row of seats and each column represents a column of seats
    const [seatsToSend, setSeatsToSend] = useState<SeatModel[]>([]); //represents the seats that were selected
    const [seatCount, setSeatCount] = useState(0);//represents how many seats were selected. The user can select up to 10 seats
    const navigate = useNavigate();

    const add = (seat: SeatModel) =>{//This function receives a seat object and adds it to the selected seats list
        setSeatsToSend([...seatsToSend, seat]);
        setSeatCount(seatCount+1);
    }

    const remove = (id: number) => {//This function receives a seat object id and removes the corresponding seat from the selected seats list
        setSeatsToSend(seatsToSend.filter(seat=> seat.id != id));
        setSeatCount(seatCount-1);
    }

    useEffect(()=>{
        clientService.getSeatsOfScreening(id)
        .then(seats => {
            seats.forEach(seat => makeTable(seat));
            setSeats(table);
        })
        .catch(err=> {
            notificationService.error(err);
            setExists(false);
        })
    }, [])

    function makeTable(seat : SeatModel){//This function recieves a list of seats and create a matrix according to the number of rows and columns
        if(table.length < seat.row){//if true, it means the seat's row number is bigger than the number of rows in the matrix, and a new row must be created
            table.push(new Array(seat));
        }else{//If false, it means the seat's row was already created, and it needs to be added to this row
            table[seat.row -1].push(seat);
        }
    }

    function addOrder(){
        userSerivce.addOrder(seatsToSend)
        .then(()=> {
            notificationService.success("Your order was receieved!");
            navigate("/movies");
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="ScreeningSeats">
			<h1 className="mb-3">Choose Seats</h1>
            {exists ? 
			seats ? <>
            <Container>
            <Row className="m-0 p-0"><Col></Col>{seats[0].map((seat, index)=> <Col>{index+1}</Col>)}</Row>{/*This line display the column number above each column*/}
            {seats.map((row, index)=>  
                <Row className="m-0 p-0" key={"row"+index}>
                    <Col key={index} xs={1}>{index+1}</Col>{/*This line display the row number to the left of each row*/}
                    {row.map(seat => <Col className="p-0" key={"col"+seat.id}><ScreeningSeatsCard key={seat.id} seat={seat} add={add} remove={remove} seatCount={seatCount}/></Col>)}
                </Row>)}
            </Container>
            
            <Container className="d-flex justify-content-center">
            {user && user.type.toString() == "USER" ? 
            <Card className="mt-5 rounded" style={{width:"250px"}}>
                <Card.Text className="pt-3"><span className="fw-bold">Number of tickets: </span> {seatCount}</Card.Text>
                <Card.Text className="mb-2"><span className="fw-bold">Total price: </span> {seatCount * 15}$</Card.Text>
                <Button className="mt-3 btn-not-seat" onClick={addOrder}>Submit</Button>
            </Card>
            : <Card className="mt-5 p-2">Log in as a user to order seats</Card>}
            </Container>
            </> 
            : <Card className="p-2">Loading seats...</Card>/*This line will be displayed only if there's such screening and the seats were not displayed yet*/
            : <Card className="p-2">No such screening</Card>}{/*This line will be displayed only if there's no such screening */}
            <Button href="/movies" className="mt-3 btn-not-seat">Back</Button>
        </div>
    );
}

export default ScreeningSeats;
