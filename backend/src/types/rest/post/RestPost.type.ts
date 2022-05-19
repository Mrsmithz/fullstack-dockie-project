import { Status } from "../../post/Status.enum";
import { OCRDocument } from "../../document/Document.type";
import mongoose from "mongoose";

export interface ICreatePost{
    title:string,
    description?:string,
    contact?:string,
    status:Status,
    tagId?:mongoose.Types.ObjectId[],
    document:OCRDocument
}

export interface IUpdatePost{
    _id:string,
    title?:string,
    description?:string,
    contact?:string,
    status?:Status,
    tagId?:mongoose.Types.ObjectId[],
    document?:OCRDocument,
    images:string
}