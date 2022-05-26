import { Schema, Document} from 'mongoose'

export interface IFollow extends Document{
    followerId:Schema.Types.ObjectId,
    followingId:Schema.Types.ObjectId
}