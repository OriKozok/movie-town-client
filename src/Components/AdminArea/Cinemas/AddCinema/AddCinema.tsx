import CinemaModel from "../../../../Models/CinemaModel";
import { useForm } from "react-hook-form";
import "./AddCinema.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import adminService from "../../../../Services/AdminService";
import { useNavigate } from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";

//This component displays a form of a new cinema that will be sent to the server
function AddCinema(): JSX.Element {

    const {register, handleSubmit} = useForm<CinemaModel>();
    const navigate = useNavigate();
    
    function send(cinema: CinemaModel){
        adminService.addCinema(cinema)
        .then(()=>{
            notificationService.success("Cinema added");
            navigate("/cinemas");
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="AddCinema">
            <h2 className="fw-bold">Add Cinema</h2>
            <Container className="d-flex justify-content-center">
			<Form onSubmit={handleSubmit(send)}>
                <Form.Group controlId="formCity" className="pt-3">
                    <Form.Label className="fw-bold">City:</Form.Label>
                    <Form.Control placeholder="Enter city" maxLength={255} {...register("city")} required/>
                </Form.Group>
                <Form.Group controlId="formRows" className="pt-3">
                    <Form.Label className="fw-bold">Number of Rows:</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of rows" {...register("numOfRows")} required/>
                </Form.Group>
                <Form.Group controlId="formCoulmns" className="pt-3">
                    <Form.Label className="fw-bold">Number of Columns:</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of columns" {...register("numOfColumns")} required/>
                </Form.Group>
                <Button type="submit" className="mt-3 btn-not-seat">Add Cinema</Button>
            </Form></Container>
            <Button href="/cinemas" className="mt-3 btn-not-seat">Back</Button>
        </div>
    );
}

export default AddCinema;
