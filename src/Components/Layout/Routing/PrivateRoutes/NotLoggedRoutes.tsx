import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";
import { createUpdatePrevRoute, PrevRouteStore } from "../../../../Redux/PrevRouteState";
import notificationService from "../../../../Services/NotificationService";

const user = authStore.getState().user;

//Routes only for clients that are'nt logged in. If the client is logged in, navigate him to the last route using the PrevRoute state
const NotLoggedRoutes= ()=>{
    var route = window.location.pathname;
    var prevRoute = PrevRouteStore.getState().prevRoute;
    if(user){
        notificationService.error("You are already logged in");
        if(prevRoute == null)
            return <Navigate to="/home"/>
        return <Navigate to={prevRoute}/>;
    }
    PrevRouteStore.dispatch(createUpdatePrevRoute(route));
    return <Outlet/>;
}
export default NotLoggedRoutes;