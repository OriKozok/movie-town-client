import axios from "axios";
import OrderModel from "../Models/OrderModel";
import SeatModel from "../Models/SeatModel";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";

//This service contains all the functions that send requests to the server as a logged in user
class UserSerivce{

    public async updateUser(user: UserModel){
        const response = await axios.put<UserModel>(appConfig.userUrl, user);
        return response.data;
    }

    public async getDetails(){
        const response = await axios.get<UserModel>(appConfig.userUrl+"details");
        return response.data;
    }

    public async getOrders(){
        const response = await axios.get<OrderModel[]>(appConfig.userUrl+"orders");
        return response.data;
    }

    public async addOrder(seats: SeatModel[]){
        const response = await axios.post<OrderModel>(appConfig.userUrl+"orders", seats);
        return response.data;
    }

    public async cancelOrder(id: number){
        const response = await axios.delete<string>(appConfig.userUrl+id);
        return response.data;
    }
}

const userSerivce = new UserSerivce();
export default userSerivce;