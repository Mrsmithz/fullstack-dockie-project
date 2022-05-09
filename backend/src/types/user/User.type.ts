import mongoose from 'mongoose'
interface User {
    _id:mongoose.Types.ObjectId,
    firstName:string,
    lastName:string,
    image: string,
    email: string,
    followings: [mongoose.Types.ObjectId],
    posts: [mongoose.Types.ObjectId],
    recentView: [mongoose.Types.ObjectId]
}

export default User