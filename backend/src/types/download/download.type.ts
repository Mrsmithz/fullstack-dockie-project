import { Schema, Document } from 'mongoose'

export interface IDownload extends Document{
    userId: Schema.Types.ObjectId,
    postId: Schema.Types.ObjectId
}