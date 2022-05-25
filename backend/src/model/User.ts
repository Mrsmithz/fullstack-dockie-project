import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { IUser } from '../types/user/User.type'

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
        unique:true,
        index:true
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


const User = model<IUser>('User', UserSchema)
const customizationOptions = {}
const UserTC = composeMongoose(User, customizationOptions)


export { User, UserTC}