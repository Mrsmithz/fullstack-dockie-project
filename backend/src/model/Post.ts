import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import { IPost } from '../types/post/Post.type'
const PostSchema : Schema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:String,
    contact:String,
    tagId:[
        {
            type:Schema.Types.ObjectId,
            ref:'Tag'
        }
    ],
    status:{
        type:String,
        enum:['public', 'private'],
        required: true
    },
    authorId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
        index:true
    },
    ratings:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:'User'
            },
            rating:{
                type: Number,
                min: 0,
                max: 5
            }
        }
    ],
    file:{
        type:Schema.Types.ObjectId,
        ref:'File',
        required:true
    },
    images:[
        {
            type:Schema.Types.ObjectId,
            ref:'File'
        }
    ],
    document:{
        type:Object,
        required: true
    }
}, { timestamps:true })
const Post = model<IPost>('Post', PostSchema)
const customizationOptions = {}
const PostTC = composeMongoose(Post, customizationOptions)

export { Post, PostTC}
