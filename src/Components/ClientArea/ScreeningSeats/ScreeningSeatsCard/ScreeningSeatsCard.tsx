import { Button } from "react-bootstrap";
import SeatModel from "../../../../Models/SeatModel";
import notificationService from "../../../../Services/NotificationService";
import "./ScreeningSeatsCard.css";

interface seatProps{
    seat: SeatModel;
    add : any;
    remove: any;
    seatCount: number;
}

//This component displays a card with a seat's details that were given in the props
function ScreeningSeatsCard(props: seatProps): JSX.Element {

    var clicked = false;
    var id = props.seat.id.toString();

    function selectSeat(){ //This function will change the selected seats list and the color of the button according to the click
        var button = document.getElementById(id) as HTMLButtonElement;
        if(button.className.includes("btn btn-success")){//This means the seat is not reserved and can be selected
            if(props.seatCount < 10)//This means the seat count is in limit
            {
                button.className = "btn btn-warning";//highlight the seat's button in order to show the seat is selected
                clicked = !clicked;
                props.add(props.seat);
            }
            else
                notificationService.error("Can't select more than 10 chairs");
        }
        else//This means the seat is selected and not it is unselected
        {
            button.className = "btn btn-success";//set the button's color back to green in order to show it is available but not selected
            clicked = !clicked;
            props.remove(props.seat.id);
        } 
    }

    function checkAvailability(){//This function will disable a button if its seat is reserved
        var button = document.getElementById(id) as HTMLButtonElement;
        if(props.seat.reserved)
            button.setAttribute("disabled", "disabled");
    }

    return (
        <div className="ScreeningSeatsCard">
			<Button className={props.seat.reserved ? "btn btn-danger" : "btn btn-success"} disabled={props.seat.reserved} onLoad={checkAvailability} id={id} onClick={selectSeat}></Button>
        </div>
    );
}

export default ScreeningSeatsCard;
