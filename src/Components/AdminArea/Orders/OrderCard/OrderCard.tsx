import { Card } from "react-bootstrap";
import OrderModel from "../../../../Models/OrderModel";
import "./OrderCard.css";

interface OrderProps{
    order: OrderModel;
}

//This component displays a card with an order's details that were given in the props
function OrderCard(props: OrderProps): JSX.Element {
    return (
        <div className="OrderCard">
			<Card className="m-2 rounded" style={{ width: '300px' }}>
            <Card.Body>
                <Card.Text><span className="fw-bold">Order Id: </span>{props.order.id}</Card.Text>
                <Card.Text><span className="fw-bold">Order's user mail: </span>{props.order.user.email}</Card.Text>
                <Card.Text><span className="fw-bold">Price: </span>{props.order.price}</Card.Text>
                <Card.Text><span className="fw-bold">Status: </span>{props.order.status.toString() == "PAID_NOT_WATCHED" ? "Paid not watched" : "Paid and watched"}</Card.Text>
                <Card.Text><span className="fw-bold">Seats' Row: </span>{props.order.seats[0].row}</Card.Text>
                <Card.Text><span className="fw-bold">Seats' Columns: </span>{props.order.seats.map(seat=> <span key={seat.id}>{seat.column} </span>)}</Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default OrderCard;
