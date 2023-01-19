import { Outlet } from "react-router-dom";
import { createUpdatePrevRoute, PrevRouteStore } from "../../../../Redux/PrevRouteState";

//Saves the route in the state and local storage
const ClientRoutes = ()=>{
        var location = window.location.pathname;
        PrevRouteStore.dispatch(createUpdatePrevRoute(location));
    return <Outlet/>;
};

export default ClientRoutes;