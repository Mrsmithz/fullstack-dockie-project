import { Schema } from 'mongoose'

export interface ICreateComment{
    comment:string,
    postId:Schema.Types.ObjectId
}

export interface IUpdateComment{
    comment:string,
    commentId:Schema.Types.ObjectId
}
export interface IDeleteComment{
    commentId:Schema.Types.ObjectId
}