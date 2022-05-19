import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import mongoose from 'mongoose'


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
}, {timestamps: true})


const User = model('User', UserSchema)
const customizationOptions = {}
const UserTC = composeMongoose(User, customizationOptions)


export { User, UserTC}