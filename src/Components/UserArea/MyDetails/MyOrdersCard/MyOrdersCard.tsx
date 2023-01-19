import { Button, Card } from "react-bootstrap";
import OrderModel from "../../../../Models/OrderModel";
import Status from "../../../../Models/Status";
import "./MyOrdersCard.css";

interface orderProps{
    order: OrderModel;
    cancel :any;
}

//This component displays a card with an order's details given in the props
function MyOrdersCard(props: orderProps): JSX.Element {

    function cancel(){
        props.cancel(props.order.id);
    }

    return (
        <div className="MyOrdersCard">
			<Card className="m-2 rounded" style={{ width: '250px' }}>
            <Card.Title className="mt-2 fw-bold">Order ID: {props.order.id}</Card.Title>
            <Card.Body>
                <Card.Text><span className="fw-bold"> Price: </span>{props.order.price}</Card.Text>
                <Card.Text><span className="fw-bold"> Status: </span>{props.order.status.toString() == "PAID_NOT_WATCHED" ? "Paid not watched" : "Paid and watched"}</Card.Text>
                <Card.Text className="fw-bold">Seats:</Card.Text>
                <Card.Text><span className="fw-bold"> Row: </span>{props.order.seats[0].row}</Card.Text>
                <Card.Text><span className="fw-bold"> Columns: </span>{props.order.seats.map(seat=> <span key={seat.id}>{seat.column} </span>)}</Card.Text>
                <Button className="btn-not-seat" onClick={cancel}>Cancel Order</Button>
            </Card.Body>
            </Card>
        </div>
    );
}

export default MyOrdersCard;
