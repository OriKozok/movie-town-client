class SeatModel{
    public id:number;
    public row: number;
    public column: number;
    public reserved: boolean;

    constructor(id:number, row: number, column: number, isReserved: boolean){
        this.id = id;
        this.row = row;
        this.column = column;
        this.reserved = isReserved;
    }
}

export default SeatModel;