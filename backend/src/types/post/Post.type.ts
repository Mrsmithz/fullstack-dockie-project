import mongoose, { Document } from "mongoose"
import { Status } from "./Status.enum"


export interface IPost extends Document {
    title:string,
    description?:string,
    contact?:string,
    tagId?:mongoose.Types.ObjectId[],
    status:Status,
    authorId?:mongoose.Types.ObjectId
    file:mongoose.Types.ObjectId,
    images:mongoose.Types.ObjectId[],
    document?:Object
}