import { Schema, Document} from 'mongoose'

export interface IView extends Document{
    postId: Schema.Types.ObjectId,
    viewerId: Schema.Types.ObjectId
}