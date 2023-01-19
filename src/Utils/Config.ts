class Config{

}

class DevelopmentConfig extends Config{
    public clientUrl: string = "http://localhost:8080/client/";
    public adminUrl: string = "http://localhost:8080/admin/";
    public userUrl: string = "http://localhost:8080/user/";
}


class ProductionConfig extends Config{
    public clientUrl: string = "http://localhost:8080/client/";
    public adminUrl: string = "http://localhost:8080/admin/";
    public userUrl: string = "http://localhost:8080/user/";
}

const appConfig = process.env.NODE_ENV === "development"? 
    new DevelopmentConfig() : new ProductionConfig();

export default appConfig;