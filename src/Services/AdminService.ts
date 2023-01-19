import MovieModel from "../Models/MovieModel"
import axios from "axios";
import appConfig from "../Utils/Config";
import CinemaModel from "../Models/CinemaModel";
import ScreeningModel from "../Models/ScreeningModel";
import OrderModel from "../Models/OrderModel";

//This service contains all the functions that send requests to the server as an administrator
class AdminService{

    public async addMovie(movie: MovieModel){
        let reader = new FileReader();
        var images = movie.image as FileList;
        reader.readAsDataURL(images[0]);
        reader.onload = async function () {
            movie.image = reader.result as string;
            const response = axios.post<MovieModel>(appConfig.adminUrl+"movies/add/", movie);
            return (await response).data;
    };
    reader.onerror = function (error) {
    console.log('Error: ', error);
    };
    }

    public async updateMovie(movie: MovieModel){
        if(typeof movie.image === "string" || movie.image instanceof String){//it means the image was not updated, and it's the string from the server
        const response = await axios.put<MovieModel>(appConfig.adminUrl+"movies/update/", movie);
        return response.data;
        }
        else{//image was updated, and is now a FileList
            let reader = new FileReader();
            var images = movie.image as FileList;
            reader.readAsDataURL(images[0]);
            reader.onload = async function () {
            movie.image = reader.result as string;
            const response = axios.put<MovieModel>(appConfig.adminUrl+"movies/update/", movie);
            return (await response).data;
            };
            reader.onerror = function (error) {
            console.log('Error: ', error);
    };
        }
    }

    public async deleteMovie(id: number){
        const response = await axios.delete<string>(appConfig.adminUrl+"movies/"+id);
        return response.data;
    }

    public async getAllMovies(){
        const response = await axios.get<MovieModel[]>(appConfig.adminUrl+"movies");
        return response.data;
    }

    public async getMovieById(id : number){
        const response = await axios.get<MovieModel>(appConfig.adminUrl+"movies/"+id);
        return response.data;
    }

    public async addCinema(cinema: CinemaModel){
        const response = await axios.post<CinemaModel>(appConfig.adminUrl+"cinemas/add/", cinema);
        return response.data;
    }

    public async deleteCinema(id: number){
        const response = await axios.delete<string>(appConfig.adminUrl+"cinemas/"+id);
        return response.data;
    }

    public async getAllCinemas(){
        const response = await axios.get<CinemaModel[]>(appConfig.adminUrl+"cinemas");
        return response.data;
    }

    public async addScreening(screening: ScreeningModel){
        const response = await axios.post<ScreeningModel>(appConfig.adminUrl+"screenings/add/", screening);
        return response.data;
    }

    public async updateScreening(screening: ScreeningModel){
        const response = await axios.put<ScreeningModel>(appConfig.adminUrl+"screenings/update", screening);
        return response.data;
    }

    public async deleteScreening(id: number){
        const response = await axios.delete<string>(appConfig.adminUrl+"screenings/"+id);
        return response.data;
    }

    public async getAllScreenings(){
        const response = await axios.get<ScreeningModel[]>(appConfig.adminUrl+"screenings");
        return response.data;
    }

    public async getScreeningById(id : number){
        const response = await axios.get<ScreeningModel>(appConfig.adminUrl+"screenings/"+id);
        return response.data;
    }

    public async getAllOrders(){
        const response = await axios.get<OrderModel[]>(appConfig.adminUrl+"orders");
        return response.data;
    }
}

const adminService = new AdminService();
export default adminService;