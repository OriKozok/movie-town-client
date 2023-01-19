import { createStore } from "redux";

export class PrevRouteState{
    prevRoute: string;

    constructor(){
        if(localStorage.getItem("prevRoute")){
            try{
                this.prevRoute = localStorage.getItem("prevRoute");
            }catch(err:any){
                console.log(err);
            }
        }
    }
}

export enum PrevRouteTypes{
    UPDATE,
    FETCH
}

export interface PrevRouteAction{
    type: PrevRouteTypes;
    payload: any;
}

export function createUpdatePrevRoute(route: string){
    return {type: PrevRouteTypes.UPDATE, payload: route};
}

export function createFetchPrevRoute(route: string){
    return {type: PrevRouteTypes.FETCH, payload: route};
}

export function prevRouteReducer(currentState = new PrevRouteState(), action: PrevRouteAction) {
    const newState = {...currentState};
    switch(action.type){
        case PrevRouteTypes.UPDATE:
            newState.prevRoute = action.payload;
            localStorage.setItem("prevRoute", action.payload);
            break;
    }
    return newState;
}

export const PrevRouteStore = createStore(prevRouteReducer);