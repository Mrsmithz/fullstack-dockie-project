import { Schema, model } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import mongoose from 'mongoose'
import CustomerUser from '../types/user/User.type'

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
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

declare global {
    namespace Express {
      interface User extends CustomerUser{

      }
    }
  }

export { User }

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