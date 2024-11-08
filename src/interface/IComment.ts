import { Schema } from "mongoose";

export interface IComment {
    userID: Schema.Types.ObjectId;
    userName:string;
    comment: string;
    created_at: Date;
    updated_at: Date;
}