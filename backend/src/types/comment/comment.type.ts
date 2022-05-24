import mongoose, {Document} from 'mongoose'

export interface IComment extends Document{
    comment: string,
    authorId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId
}