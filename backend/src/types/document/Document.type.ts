import mongoose from "mongoose";
export interface OCRDocument{
    title:string[],
    text:string,
    fileId:mongoose.Types.ObjectId,
}