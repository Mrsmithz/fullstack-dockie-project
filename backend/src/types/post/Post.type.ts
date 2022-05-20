import mongoose, { Document, Schema} from "mongoose"
import { Status } from "./Status.enum"


export interface IRating {
    userId: Schema.Types.ObjectId,
    rating: number
}
export interface IPost extends Document {
    title:string,
    description?:string,
    contact?:string,
    tagId?:mongoose.Types.ObjectId[],
    status:Status,
    authorId?:mongoose.Types.ObjectId
    file:mongoose.Types.ObjectId,
    images:mongoose.Types.ObjectId[],
    document?:Object,
    ratings: IRating[]
}