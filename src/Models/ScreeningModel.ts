import CinemaModel from "./CinemaModel";
import MovieModel from "./MovieModel";

class ScreeningModel{
    public id?: number;
    public cinema: CinemaModel;
    public movie: MovieModel;
    public time: Date;

    constructor(id:number, cinema:CinemaModel, movie:MovieModel, time: Date){
        this.id = id;
        this.cinema = cinema;
        this.movie = movie;
        this.time = time;
    }
}

export default ScreeningModel;