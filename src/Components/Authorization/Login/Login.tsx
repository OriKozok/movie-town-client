import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Credentials from "../../../Models/Credentials";
import { authStore } from "../../../Redux/AuthState";
import clientService from "../../../Services/ClientService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

//This component displays a log in form that after clicking on the button will  attemp to log in the client
function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<Credentials>();
    const navigate = useNavigate();
    
    function send(creds: Credentials){
        clientService.login(creds)
        .then(()=>{
            var user = authStore.getState().user;
            navigate("/movies");
            notificationService.success("Hello "+user.name);
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="Login">
            <Container className="d-flex justify-content-center">
			<Form onSubmit={handleSubmit(send)}>
                <Form.Group controlId="formEmail" className="pt-3">
                    <Form.Label className="fw-bold">Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" maxLength={255} {...register("email")} required/>
                </Form.Group>
                <Form.Group controlId="formPassword" className="pt-3">
                    <Form.Label className="fw-bold">Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" maxLength={255} {...register("password")} required/>
                </Form.Group>
                <Button className="mt-3 btn-not-seat" type="submit">Log In</Button>
            </Form></Container>
        </div>
    );
}

export default Login;
