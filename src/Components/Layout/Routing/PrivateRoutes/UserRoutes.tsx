import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";
import { createUpdatePrevRoute, PrevRouteStore } from "../../../../Redux/PrevRouteState";
import notificationService from "../../../../Services/NotificationService";

const user = authStore.getState().user;

//Routes only for registered users. Recieves a component and 
//navigate to it only if the user is fulfilling the conditions
const UserRoutes = ()=>{//Routes onl
    if(!user){
        notificationService.error("You are not logged as user");
        return <Navigate to="/login"/>;
    }
    if(user && user.type.toString() !== "USER"){
        notificationService.error("You are unauthorized");
        return <Navigate to={PrevRouteStore.getState().prevRoute}/>;
    }
    var location = window.location.pathname;
    PrevRouteStore.dispatch(createUpdatePrevRoute(location));
    return <Outlet/>;
};

export default UserRoutes;