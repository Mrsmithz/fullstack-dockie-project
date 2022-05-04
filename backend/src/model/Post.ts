import { Schema, model } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

const PostSchema : Schema = new Schema({
    title:String,
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
        enum:['public', 'private']
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
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
        ref:'File'
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
    document:Object
})
PostSchema.plugin(timestamp)
const Post = model('Post', PostSchema)
const customizationOptions = {}
const PostTC = composeMongoose(Post, customizationOptions)

export { Post }

schemaComposer.Query.addFields({
    postById: PostTC.mongooseResolvers.findById(),
    post: PostTC.mongooseResolvers.findOne(),
    posts: PostTC.mongooseResolvers.findMany(),
    postCount: PostTC.mongooseResolvers.count()
})

schemaComposer.Mutation.addFields({
    postCreateOne: PostTC.mongooseResolvers.createOne(),
    postUpdateById: PostTC.mongooseResolvers.updateById(),
    postUpdateOne: PostTC.mongooseResolvers.updateOne(),
    postRemoveById: PostTC.mongooseResolvers.removeById(),
    postRemoveOne: PostTC.mongooseResolvers.removeOne()
})

const schema = schemaComposer.buildSchema()

export default schema
