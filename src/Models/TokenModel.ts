import ClientType from "./ClientType";

class TokenModel{
    public id?: number;
    public name: string;
    public email: string;
    public type: ClientType;

    constructor(id: number, name: string, email: string, type: ClientType){
        this.id = id;
        this.name = name;
        this.email = email; 
        this.type = type;
    }
}

export default TokenModel;