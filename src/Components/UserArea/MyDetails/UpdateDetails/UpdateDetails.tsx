import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import userSerivce from "../../../../Services/UserService";
import "./UpdateDetails.css";
import notificationService from "../../../../Services/NotificationService";

//This function displays a form of a user that will be updated
function UpdateDetails(): JSX.Element {

    const {register, handleSubmit, setValue} = useForm<UserModel>();
    const navigate = useNavigate();
    const user = authStore.getState().user;
    var id: number;

    useEffect(()=>{
        if(user && user.type.toString() == "USER"){
            userSerivce.getDetails()
            .then(user=>{
                id = user.id
                setValue("name", user.name);
                setValue("email", user.email);
                setValue("password", user.password);
            })
            .catch(err=>notificationService.error(err));
        }
    },[])

    function submit(user: UserModel){
        user.id = id;
        userSerivce.updateUser(user)
        .then(message=>{
            notificationService.success("Details updated");
            navigate("/details");
        })
        .catch(err=> notificationService.error(err));
    }

    return (
        <div className="UpdateDetails">
            <h1>Update Details</h1>
            <Container className="d-flex justify-content-center">
                <Form onSubmit={handleSubmit(submit)}>
                <Form.Group controlId="name" className="pt-3">
                    <Form.Label className="fw-bold">Name:</Form.Label>
                    <Form.Control placeholder="Enter name" maxLength={255} {...register("name")} required/>
                </Form.Group>
                <Form.Group controlId="email" className="pt-3">
                    <Form.Label className="fw-bold">Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" maxLength={255} {...register("email")} required/>
                </Form.Group>
                <Form.Group controlId="password" className="pt-3">
                    <Form.Label className="fw-bold">Password:</Form.Label>
                    <Form.Control placeholder="Enter password" maxLength={255} {...register("password")} required/>
                </Form.Group>
                <Button type="submit" className="mt-3 btn-not-seat">Update</Button>
            </Form></Container>
            <Button href="/details" className="mt-3 btn-not-seat">Back</Button>
        </div>
    );
}

export default UpdateDetails;
