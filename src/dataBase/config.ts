import mongoose from "mongoose";

export const DB_Connection = async (): Promise<void> => {

    const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@plantasstore.ymimy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

    try {
        if (!url) {
            throw new Error('No database URL provided ' + url);
        }
        await mongoose.connect(url);
        console.log('Database connected');

    } catch (error) {
        console.log(error);
        throw new Error('Error  connecting to the database');
    }
};