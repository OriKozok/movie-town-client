import "./MyDetails.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import userSerivce from "../../../Services/UserService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import notificationService from "../../../Services/NotificationService";
import OrderModel from "../../../Models/OrderModel";
import MyOrdersCard from "./MyOrdersCard/MyOrdersCard";

//This component displays a user's details and orders
function MyDetails(): JSX.Element {

    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    const cancel = (id: number) =>{//This function receives an order id and deleted the corresponding order from the DB and the display
        userSerivce.cancelOrder(id)
        .then(message=> {
            notificationService.success(message);
            setOrders(orders.filter(order=> order.id != id));
        })
        .catch(err=> console.log(err));
    }

    useEffect(()=>{
        userSerivce.getOrders()
        .then(orders=>setOrders(orders))
        .catch(err=> notificationService.error(err));
    },[])

    useEffect(()=>{
        userSerivce.getDetails()
        .then(user=>setUser(user))
        .catch(err=> notificationService.error(err));
    }, [orders])

    function goToUpdate(){
        navigate("/user/update")
    }

    return (
        <div className="MyDetails">
            {user && 
            <>
            <h1>Details & Orders</h1>
            <Container className="d-flex justify-content-center">
                <Card style={{ width: "250px" }} className="mb-3 mt-3">
                    <Card.Text className="pt-2"><span className="fw-bold">Name: </span>{user.name}</Card.Text>
                    <Card.Text><span className="fw-bold">Email:</span> {user.email}</Card.Text>
                    <Card.Text><span className="fw-bold">Password0:</span> {user.password}</Card.Text>
                    <Button onClick={goToUpdate} className="btn-not-seat">Update</Button>
                </Card></Container></>}
            <Container fluid><Row className="d-flex justify-content-center pt-3">
            {orders?.length > 0 ? orders?.map(order=> <Col className="d-flex justify-content-center" xs='12' md='6' lg='2'>
                <MyOrdersCard order={order} key={order.id} cancel={cancel}/></Col>)
            : <Card className="p-2">You have no orders</Card>}</Row></Container> 
        </div>
    );
}

export default MyDetails;
