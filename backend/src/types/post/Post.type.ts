import mongoose from "mongoose"
import { Status } from "./Status.enum"


export interface IPost {
    title:string,
    description?:string,
    contact?:string,
    tags?:string[],
    status:Status,
    owner?:mongoose.Types.ObjectId
    file:mongoose.Types.ObjectId,
    images:mongoose.Types.ObjectId[],
    document?:Object
}