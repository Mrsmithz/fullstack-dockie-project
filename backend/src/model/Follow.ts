import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { IFollow } from '../types/follow/follow.type'
const FollowSchema = new Schema<IFollow>({
    followerId:{
        type:Schema.Types.ObjectId,
        index:true,
        required:true,
        ref: 'User'
    },
    followingId:{
        type:Schema.Types.ObjectId,
        index:true,
        required:true,
        ref: 'User'
    }
}, {timestamps : true})

const Follow = model<IFollow>('Follow', FollowSchema)
const customizationOptions = {}
const FollowTC = composeMongoose(Follow, customizationOptions)

export {Follow, FollowTC}