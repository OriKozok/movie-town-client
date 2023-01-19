import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import OrderModel from "../../../Models/OrderModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import OrderCard from "./OrderCard/OrderCard";
import "./Orders.css";

//This component displays all the orders in the DB
function Orders(): JSX.Element {

    const [orders, setOrders] = useState<OrderModel[]>();

    useEffect(()=>{
        adminService.getAllOrders()
        .then(orders=> setOrders(orders))
        .catch(err=> notificationService.error(err));
    })

    return (
        <div className="Orders">
            <h2 className="fw-bold">Orders</h2>
            <Container fluid>
            {orders?.length > 0 ?
            <Row className="d-flex justify-content-center pt-3">
			{orders?.map(order=> <Col className="d-flex justify-content-center" xs='12' md='6' lg='2'><OrderCard key={order.id} order={order}/></Col>)}
            </Row>
        : <Card className="p-2">No orders</Card>}</Container>
        </div>
    );
}

export default Orders;
