import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";
import { useState, useEffect } from "react";
import TokenModel from "../../../Models/TokenModel";
import { Nav } from "react-bootstrap";
import clientService from "../../../Services/ClientService";
import { useNavigate } from "react-router-dom";
import notificationService from "../../../Services/NotificationService";

//This component displays a nav list which change according to the type of user
function Menu(): JSX.Element {

    const [user, setUser] = useState<TokenModel>();
    const navigate = useNavigate();

    useEffect(() => {//Subsribe to authStore in order to change the menu if the client logs in or logs out
        setUser(authStore.getState().user);
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
    }, [])

    function signOut(){
        clientService.logOut()
        .then(message=> {
        navigate("/home");
        notificationService.success(message);})
        .catch(err=>notificationService.error(err));
    }

    return (
        <div className="Menu">
        <Nav>
            <Nav.Item>
                <Nav.Link className="btn-warning" href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/movies">Movies</Nav.Link>
            </Nav.Item>
            {user && user.type.toString() == "ADMINISTRATOR" &&//Links available only to administrator
            <>
            <Nav.Item>
                <Nav.Link href="/cinemas">Cinemas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/screenings">Screenings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav.Item>
            </>}
            {user && user.type.toString() == "USER" &&//Links available only to a logged in user
            <>
            <Nav.Item>
                <Nav.Link href="/details">Details</Nav.Link>
            </Nav.Item>
            </>}
            {!user && //Links available only to clients that aren't logged in
            <>
            <Nav.Item>
                <Nav.Link href="/login">Log In</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
            </>}
            {user && //Links available only to a logged in client (user or admin)
            <>
            <Nav.Item>
                <Nav.Link disabled className="text-end" style={{width:"250px"}}>Hello {user.name}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={signOut}>Sign out</Nav.Link>
            </Nav.Item></>
            }
        </Nav>
        </div>
    );
}

export default Menu;
