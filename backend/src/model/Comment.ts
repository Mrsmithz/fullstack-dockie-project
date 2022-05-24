import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { IComment } from '../types/comment/comment.type'
const CommentSchema = new Schema({
    comment:{
        type: String,
        required: true
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        index:true
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required:true,
        index:true
    }
}, {timestamps: true})

const Comment = model<IComment>('Comment', CommentSchema)
const customizationOptions = {}
const CommentTC = composeMongoose(Comment, customizationOptions)

export {Comment, CommentTC}