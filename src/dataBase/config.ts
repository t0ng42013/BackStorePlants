import mongoose from "mongoose";

export const DB_Connection = async (): Promise<void> => {
    const { DB: url } = process.env;


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