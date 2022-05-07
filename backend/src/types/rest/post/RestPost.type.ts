import { Status } from "../../post/Status.enum";
import { OCRDocument } from "../../document/Document.type";
import mongoose from "mongoose";

export interface ICreatePost{
    title:string,
    description?:string,
    contact?:string,
    status:Status,
    tags?:string[],
    document:OCRDocument
}

export interface IUpdatePost{
    _id:string,
    title?:string,
    description?:string,
    contact?:string,
    status?:Status,
    tags?:string
    document?:OCRDocument,
    images:string
}