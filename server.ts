import express,{ Express } from "express";
import { DB_Connection } from './src/dataBase/config';
import cors from "cors";

import indexRouter from './src/routes/indexRoutes'
import authRouter from './src/routes/authRoutes'
import productRouter from './src/routes/productRoutes'
import orderRouter from './src/routes/orderRoutes'
import userRoutes from './src/routes/usersRoutes'
import commentRoutes from './src/routes/commentsRoutes'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./src/config/swagger.config";



export class Server{
    private app: Express;
    private port: number;
    private indexPath: string;
    private authPath: string;
    private productPath: string;
    private ordersPath: string;
    private commentsPath: string;
    private userPath: string;


    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.indexPath = '/';
        this.authPath = '/auth';
        this.productPath = '/products';
        this.ordersPath = '/orders';
        this.commentsPath = '/comments';
        this.userPath = '/user';


        this.connectDB();
        this.middelware();
        this.routes();
    }

    private connectDB() {
        DB_Connection();
    }

    private middelware(){
        this.app.use(cors(
            {
                origin: 'https://jardin-ten.vercel.app',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization','x-token'],
            }
        ));
        this.app.use(express.json());
        
        this.app.use(express.static('public'));

        // Swagger setup
        const specs = swaggerJSDoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
            customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            customJs: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
            ]
        }));
    };

    private routes() {
        this.app.use(this.indexPath, indexRouter)

        this.app.use(this.authPath, authRouter)
        this.app.use(this.productPath, productRouter)
        this.app.use(this.ordersPath, orderRouter)
        this.app.use(this.commentsPath, commentRoutes)
        this.app.use(this.userPath, userRoutes)
    };

    public start(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}