import { Status } from "../../post/Status.enum";
import { Document } from "../../document/Document.type";
export interface ICreatePost{
    title:string,
    description?:string,
    contact?:string,
    status:Status,
    tags?:string[],
    document:Document
}