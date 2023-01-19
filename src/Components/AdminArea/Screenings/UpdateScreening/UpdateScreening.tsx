import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
// @ts-ignore
import TimePicker from 'react-bootstrap-time-picker';
import "./UpdateScreening.css";
import adminService from "../../../../Services/AdminService";
import {  useNavigate, useParams } from "react-router-dom";
import ScreeningModel from "../../../../Models/ScreeningModel";
import { flushSync } from "react-dom";
import notificationService from "../../../../Services/NotificationService";

//This function displays a form of a screening that will be updated and sent to the server
function UpdateScreening(): JSX.Element {

    const [screening, setScreening] = useState<ScreeningModel>();
    const [date, setDate] = useState<string>("");//represents day of the month, month and year
    var today = new Date().toISOString().substring(0,10);//ISOString returns a string with a date with hours and minutes, and only year, month and day is needed
    const [time, setTime] = useState(0);//represents hours and minutes
    const params = useParams();
    const id = +params.id!;
    const navigate = useNavigate();
    const changeDate = (event: { target: { value: any; }; })=>{//changes the date selected in the state in order to update the screening's date
        setDate(event.target.value);
    };

    useEffect(()=>{
        adminService.getScreeningById(id)
        .then(screening=> {setScreening(screening);
            var date = new Date(screening.time);
            setDate(date.toISOString().substring(0,10));
            setTime((date.getHours()*3600) + (date.getMinutes()*60));//time is calculated by seconds, therefore the time from the server needs to be converted
        })
        .catch(err=> notificationService.error(err));
        }, [])

    function update(){
        setScreening(self=>{
            self.time = new Date();//time is a string, so it needs to be converted to an actual date
            var dateObject = new Date(date);//convert the selected date from string to an actual date
            self.time.setFullYear(dateObject.getFullYear());
            self.time.setMonth(dateObject.getMonth());
            self.time.setDate(dateObject.getDate());
            self.time.setSeconds(0);
            var hoursAndMinutes = time/3600;//the time variable is the selected time in seconds. This calculation converts the seconds to hours (minutes is the number after the decimal point)
            if(hoursAndMinutes%1 == 0){//The time is x:00
                self.time.setHours(hoursAndMinutes);
                self.time.setMinutes(0);
            }else{//time is x:30
                self.time.setHours(hoursAndMinutes-0.5)
                self.time.setMinutes(30);
            }
            return self;
        })
    }

    function send(){
        flushSync(()=>{//FlushSync enable the screening to be updated before the sending to the server. Without it, the screening's time will not be updated
            update();
        })
        adminService.updateScreening(screening)
        .then(()=>{
            notificationService.success("Screening updated");
            navigate("/screenings");
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="UpdateScreening">
            <h2 className="fw-bold">Update Screening</h2>
            {screening ? <>
            <Container className="d-flex justify-content-center">
                <Card className="rounded mt-2" style={{ width: "250px" }}>
                    <Card.Body>
                        <Card.Text><span className="fw-bold">Screening id: </span>{screening.id}</Card.Text>
                        <Card.Text><span className="fw-bold">Movie name: </span>{screening.movie.name}</Card.Text>
                        <Card.Text><span className="fw-bold">Cinema: </span>{screening.cinema.city}, hall {screening.cinema.hallId}</Card.Text>
                    </Card.Body>
                </Card></Container><Container className="d-flex justify-content-center">
                    <Form className="pt-3">
                        <Form.Group controlId="formDate">
                            <Form.Label className="fw-bold">Date:</Form.Label>
                            <Form.Control type="date" defaultValue={date} min={today} onChange={changeDate} required />
                        </Form.Group>
                        <Form.Group className="pt-3" controlId="formTime">
                            <Form.Label className="fw-bold">Time:</Form.Label>
                            <TimePicker value={time} start="09:00" end="23:30" step={30} onChange={(time: number) => setTime(time)} required />
                        </Form.Group>
                        <Button className="mt-3 btn-not-seat" onClick={send}>Update Screening</Button>
                    </Form></Container></>
            : <Card className="p-2">No such Screening</Card>}
            <Button className="mt-3 btn-not-seat" href="/screenings">Back</Button>
        </div>
    );
}

export default UpdateScreening;
