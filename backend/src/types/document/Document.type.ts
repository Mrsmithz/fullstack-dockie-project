import mongoose from "mongoose";
export interface Document{
    title:string[],
    text:string,
    fileId:mongoose.Types.ObjectId,
}