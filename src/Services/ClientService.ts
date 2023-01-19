import axios from "axios";
import Credentials from "../Models/Credentials";
import Genre from "../Models/Genre";
import MovieModel from "../Models/MovieModel";
import ScreeningModel from "../Models/ScreeningModel";
import SeatModel from "../Models/SeatModel";
import UserModel from "../Models/UserModel";
import { authStore, loginAction, registerAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

//This service contains all the functions that send requests to the server that don't require authentication
class ClientService{

    public async register(user: UserModel){
        const response = await axios.post<string>(appConfig.clientUrl+"register", user);
        const token = (await response).data;
        authStore.dispatch(registerAction(token));
    }

    public async login(cred : Credentials){
        const response = await axios.post<string>(appConfig.clientUrl+"login?email=" + cred.email + "&password=" + cred.password);
        const token = (await response).data;
        authStore.dispatch(loginAction(token));
    }

    public async logOut(){
        const response = await axios.post<string>(appConfig.clientUrl+"out");
        authStore.dispatch(logoutAction());
        return response.data;
    }

    public async getAllMovies(){
        const response = await axios.get<MovieModel[]>(appConfig.clientUrl+"movies");
        return response.data;
    }

     public async getMovieById(id:number){
         const response = await axios.get<MovieModel>(appConfig.clientUrl+"movies/"+id);
         return response.data;
     }

    public async getMoviesByCity(city:string){
        const response = await axios.get<MovieModel[]>(appConfig.clientUrl+"movies/city/"+city);
        return response.data;
    }

    public async getAllScreenings(){
        const response = await axios.get<ScreeningModel[]>(appConfig.clientUrl+"screenings");
        return response.data;
    }

    public async getScreeningsByMovieId(id : number){
        const response = await axios.get<ScreeningModel[]>(appConfig.clientUrl+"screenings/movie/"+id);
        return response.data;
    }

    public async getSeatsOfScreening(id : number){
        const response = await axios.get<SeatModel[]>(appConfig.clientUrl+"screenings/seats/"+id);
        return response.data;
    }
}

const clientService = new ClientService();
export default clientService;