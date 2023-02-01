import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import clientService from "../../../Services/ClientService";
import notificationService from "../../../Services/NotificationService";
import "./Register.css";

//This component displays a registration form, that after clicking on the button will register the client in the server
function Register(): JSX.Element {

    const {register, handleSubmit} = useForm<UserModel>();
    const navigate = useNavigate();

    function send(user: UserModel){
        clientService.register(user)
        .then(()=> navigate("/movies"))
        .catch(err=> notificationService.success(err));
    }

    return (
        <div className="Register">
            <Container className="d-flex justify-content-center">
			<Form onSubmit={handleSubmit(send)}>
                <Form.Group controlId="formBasicName">
                    <Form.Label className="fw-bold">Name:</Form.Label>
                    <Form.Control placeholder="Enter name" maxLength={255} {...register("name")} required/>
                </Form.Group>
                <Form.Group className="pt-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" maxLength={255} {...register("email")} required/>
                </Form.Group>
                <Form.Group className="pt-3" controlId="formBasicPassword">
                    <Form.Label className="fw-bold">Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" maxLength={255} {...register("password")} required/>
                </Form.Group>
                <Button type="submit" className="mt-3 btn-not-seat">Register</Button>
            </Form></Container>
        </div>
    );
}

export default Register;
