import { Schema, model } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    image:{
        type:Schema.Types.ObjectId,
        ref:'File'
    },
    email:String,
    followings:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    recentView:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

UserSchema.plugin(timestamp)
const User = model('User', UserSchema)
const customizationOptions = {}
const UserTC = composeMongoose(User, customizationOptions)

schemaComposer.Query.addFields({
    userById: UserTC.mongooseResolvers.findById(),
    user: UserTC.mongooseResolvers.findOne(),
    users: UserTC.mongooseResolvers.findMany(),
    userCount: UserTC.mongooseResolvers.count()
})

schemaComposer.Mutation.addFields({
    userCreateOne: UserTC.mongooseResolvers.createOne(),
    userUpdateById: UserTC.mongooseResolvers.updateById(),
    userUpdateOne: UserTC.mongooseResolvers.updateOne(),
    userRemoveById: UserTC.mongooseResolvers.removeById(),
    userRemoveOne: UserTC.mongooseResolvers.removeOne()
})

const schema = schemaComposer.buildSchema()

export default schema