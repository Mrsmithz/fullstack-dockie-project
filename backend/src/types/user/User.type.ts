import mongoose, { Document } from 'mongoose'
interface User extends Document{
    firstName:string,
    lastName:string,
    image: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    followings: [mongoose.Types.ObjectId],
    posts: [mongoose.Types.ObjectId],
    recentView: [mongoose.Types.ObjectId]
}

export default User