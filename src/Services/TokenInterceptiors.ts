import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors{
    public createInterceptors(){
        axios.interceptors.request.use( request=>{
            if(authStore.getState().token){
                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                }
            }
            return request;
        })
    }
}

export const interceptors = new Interceptors();