import mongoose from "mongoose";
import { DB_Connection } from './src/dataBase/config';
import Product from './src/models/Product';
import Order from "./src/models/order";


const Productos = [
    {
        "id": 1,
        "name": "Monstera",
        "img": "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-8.jpg",
        "describe": "Planta de hojas grandes y decorativas",
        "price": 1500,
        "category": "interior",
        "stock": 16
    },
    {
        "id": 2,
        "name": "Pothos",
        "img": "",
        "describe": "Planta trepadora fácil de cuidar",
        "price": 2500,
        "category": "interior",
        "stock": 1
    },
    {
        "id": 3,
        "name": "Spathiphyllum",
        "img": "",
        "describe": "Conocida como la paz, ideal para interiores",
        "price": 3000,
        "category": "interior",
        "stock": 3
    },
    {
        "id": 4,
        "name": "Sansevieria",
        "img": "",
        "describe": "Planta resistente, perfecta para principiantes",
        "price": 1200,
        "category": "interior",
        "stock": 50
    },
    {
        "id": 5,
        "name": "Cactus",
        "img": "",
        "describe": "Planta suculenta que necesita poco riego",
        "price": 1800,
        "category": "exterior",
        "stock": 33
    },
    {
        "id": 6,
        "name": "Ficus elastica",
        "img": "",
        "describe": "Planta con hojas brillantes y grandes",
        "price": 2000,
        "category": "interior",
        "stock": 7
    },
    {
        "id": 7,
        "name": "Aloe Vera",
        "img": "",
        "describe": "Planta suculenta con propiedades medicinales",
        "price": 1600,
        "category": "exterior",
        "stock": 35
    },
    {
        "id": 8,
        "name": "Lirio de la paz",
        "img": "",
        "describe": "Planta de flores blancas y hojas verdes",
        "price": 2200,
        "category": "interior",
        "stock": 6
    },
    {
        "id": 9,
        "name": "Orquídea",
        "img": "",
        "describe": "Planta de flores hermosas y variadas",
        "price": 2700,
        "category": "interior",
        "stock": 19
    },
    {
        "id": 10,
        "name": "Ciclamen",
        "img": "",
        "describe": "Planta de flores coloridas en invierno",
        "price": 1400,
        "category": "interior",
        "stock": 6
    },
    {
        "id": 11,
        "name": "Begonia",
        "img": "",
        "describe": "Planta con hojas y flores atractivas",
        "price": 1900,
        "category": "interior",
        "stock": 10
    },
    {
        "id": 12,
        "name": "Dracaena",
        "img": "",
        "describe": "Planta de crecimiento vertical y fácil cuidado",
        "price": 2100,
        "category": "interior",
        "stock": 0
    },
    {
        "id": 13,
        "name": "Bamboo",
        "img": "",
        "describe": "Planta de interior que simboliza la suerte",
        "price": 1750,
        "category": "interior",
        "stock": 26
    },
    {
        "id": 14,
        "name": "Geranio",
        "img": "",
        "describe": "Planta de flores coloridas para exteriores",
        "price": 1300,
        "category": "exterior",
        "stock": 50
    },
    {
        "id": 15,
        "name": "Hortensia",
        "img": "",
        "describe": "Planta de flores grandes y coloridas",
        "price": 2400,
        "category": "exterior",
        "stock": 13
    },
    {
        "id": 16,
        "name": "Césped",
        "img": "",
        "describe": "Planta básica para jardines",
        "price": 1900,
        "category": "exterior",
        "stock": 0
    },
    {
        "id": 17,
        "name": "Echeveria",
        "img": "",
        "describe": "Planta suculenta muy decorativa",
        "price": 2100,
        "category": "exterior",
        "stock": 14
    },
    {
        "id": 18,
        "name": "Pino enano",
        "img": "",
        "describe": "Planta perenne ideal para jardines pequeños",
        "price": 1550,
        "category": "exterior",
        "stock": 33
    },
    {
        "id": 19,
        "name": "Lavanda",
        "img": "",
        "describe": "Planta aromática con flores moradas",
        "price": 1850,
        "category": "exterior",
        "stock": 25
    },
    {
        "id": 20,
        "name": "Petunia",
        "img": "",
        "describe": "Planta con flores vibrantes para el jardín",
        "price": 2300,
        "category": "exterior",
        "stock": 29
    }

];



export const seedDatabase = async () => {
    try {
        

        await Product.deleteMany({});
        console.log('Productos eliminados');

        await Product.insertMany(Productos);
        console.log('Productos insertados');

        mongoose.connection.close();
        console.log('Conexión cerrada');
    } catch (error) {
        console.error('Error al insertar productos:', error);
        mongoose.connection.close();
    }
};



