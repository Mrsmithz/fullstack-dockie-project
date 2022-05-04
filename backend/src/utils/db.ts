import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path: `.env.${process.env.NODE_ENV}`})

mongoose.Promise = global.Promise

const connectDB = async (URI : string) => {
    return await mongoose.connect(URI, {
        autoIndex:true,
        keepAlive:true,
        maxPoolSize:50
    })
}
const disconnectDB = async () => {
    return await mongoose.connection.close()
}

const clearDB = async () => {
    const collections = mongoose.connection.collections
    for (const key in collections){
        const collection = collections[key]
        await collection.deleteMany({})
    }
}
export { connectDB, disconnectDB, clearDB}