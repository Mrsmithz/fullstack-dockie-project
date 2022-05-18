import { Schema, model } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

const PostSchema : Schema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:String,
    contact:String,
    tags:[
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
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    downloadFromUser:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    ratings:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            },
            rating:Number
        }
    ],
    ratingAvg:Number,
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
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    document:{
        type:Object,
        required: true
    }
})
PostSchema.plugin(timestamp)
const Post = model('Post', PostSchema)
const customizationOptions = {}
const PostTC = composeMongoose(Post, customizationOptions)

export { Post, PostTC}
