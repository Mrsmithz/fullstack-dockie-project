import { Schema } from 'mongoose'
import { Status } from '../post/Status.enum'
export interface IAddRatingArgs{
    postId:Schema.Types.ObjectId
    rating:number
}

export interface IPostArgs{
    _id:Schema.Types.ObjectId
}

export interface IUpdatePostArgs extends IPostArgs{
    title?:string,
    description?:string,
    contact?:string,
    status:Status,
    tagId?:Schema.Types.ObjectId[]
}
export interface IRemovePostArgs extends IPostArgs{

}