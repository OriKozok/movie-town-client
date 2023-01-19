import Genre from "./Genre";

class MovieModel{
    public id?: number;
    public name: string;
    public genre: Genre;
    public description: string;
    public duration: number;
    public image: string | FileList;

    constructor(id:number, name:string, genre:Genre, description: string, duration: number, image: string | FileList){
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.description = description;
        this.duration = duration;
        this.image = image;
    }
}

export default MovieModel;