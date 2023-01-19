class CinemaModel{
    public id?: number;
    public city: string;
    public numOfRows: number;
    public numOfColumns: number;
    public hallId?: number;

    constructor(id:number, city:string, numOfRows: number, numOfColumns: number, hallId: number){
        this.id = id;
        this.city = city;
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        this.hallId = hallId;
    }
}

export default CinemaModel;