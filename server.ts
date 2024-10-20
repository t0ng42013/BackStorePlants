import express,{ Express } from "express";
import { DB_Connection } from './src/dataBase/config';

import indexRouter from './src/routes/indexRoutes'
import authRouter from './src/routes/authRoutes'


export class Server{
    private app: Express;
    private port: number;
    private indexPath: string;
    private authPath: string;
    private productPath: string;
    private ordersPath: string;


    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.indexPath = '/';
        this.authPath = '/auth';
        this.productPath = '/product';
        this.ordersPath = '/orders';


        this.connectDB();
        this.middelware();
        this.routes();
    }

    private connectDB() {
        DB_Connection();
    }

    private middelware(){
        this.app.use(express.json());
    };

    private routes() {
        console.log('entrando a rutas')
        this.app.use(this.indexPath, indexRouter)

        this.app.use(this.authPath, authRouter)
        this.app.use(this.productPath, indexRouter)
        this.app.use(this.ordersPath, indexRouter)
    };

    public start(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}