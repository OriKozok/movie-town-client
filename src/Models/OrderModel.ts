import SeatModel from "./SeatModel";
import Status from "./Status";
import UserModel from "./UserModel";

class OrderModel{
    public id?: number;
    public price: number;
    public status: Status;
    public user: UserModel;
    public seats?: SeatModel[];

    constructor(id:number, price:number, status:Status, user: UserModel, seats: SeatModel[]){
        this.id = id;
        this.price = price;
        this.status = status;
        this.user = user;
        this.seats = seats;
    }
}

export default OrderModel;