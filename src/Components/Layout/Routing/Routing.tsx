import "./Routing.css";
import { Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home";
import Movies from "../../ClientArea/Movies/Movies";
import MoviesDetails from "../../ClientArea/Movies/MoviesDetails/MoviesDetails";
import Cinemas from "../../AdminArea/Cinemas/Cinemas";
import MyDetails from "../../UserArea/MyDetails/MyDetails";
import Register from "../../Authorization/Register/Register";
import Login from "../../Authorization/Login/Login";
import UpdateDetails from "../../UserArea/MyDetails/UpdateDetails/UpdateDetails";
import AddCinema from "../../AdminArea/Cinemas/AddCinema/AddCinema";
import UpdateMovie from "../../AdminArea/Movies/UpdateMovie/UpdateMovie";
import AddMovie from "../../AdminArea/Movies/AddMovie/AddMovie";
import Screenings from "../../AdminArea/Screenings/Screenings";
import AddScreening from "../../AdminArea/Screenings/AddScreening/AddScreening";
import UpdateScreening from "../../AdminArea/Screenings/UpdateScreening/UpdateScreening";
import UserRoutes from "./PrivateRoutes/UserRoutes";
import PageNotFound from "../../PageNotFound/PageNotFound";
import Orders from "../../AdminArea/Orders/Orders";
import ClientRoutes from "./PrivateRoutes/ClientRoutes";
import NotLoggedRoutes from "./PrivateRoutes/NotLoggedRoutes";
import AdminRoutes from "./PrivateRoutes/AdminRoutes";
import ScreeningSeats from "../../ClientArea/ScreeningSeats/ScreeningSeats";

//This component handles the display of components according to the url
function Routing(): JSX.Element {

    return (
        <div className="Routing">
			<Routes>
            <Route element={<ClientRoutes/>}>
                <Route path="/home" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<MoviesDetails />} />
                <Route path="/screening/:id/seats" element={<ScreeningSeats />} />
                <Route path="/" element={<Home />} />
            </Route>
            
            <Route element={<NotLoggedRoutes/>}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AdminRoutes/>}>
                <Route path="/cinemas" element={<Cinemas />} />
                <Route path="/cinemas/add" element={<AddCinema />} />
                <Route path="/screenings" element={<Screenings />} />
                <Route path="/screenings/add" element={<AddScreening />} />
                <Route path="/screenings/update/:id" element={<UpdateScreening />}  />
                <Route path="/movies/add" element={<AddMovie />} />
                <Route path="/movies/update/:id" element={<UpdateMovie />} />
                <Route path="/orders" element={<Orders/>}/>
            </Route>
            
            <Route element={<UserRoutes/>}>
                <Route path="/details" element={<MyDetails />} />
                <Route path="/user/update" element={<UpdateDetails/>} />
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
