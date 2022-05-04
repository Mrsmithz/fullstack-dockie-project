import mongoose from "mongoose"
import { GridFSBucket } from "mongoose/node_modules/mongodb"


let FileUploadBucket : GridFSBucket
let ImageUploadBucket : GridFSBucket
let conn : mongoose.Connection

const connectGridFS = (uri : string) => {
    return new Promise((resolve, reject) => {
        conn = mongoose.createConnection(uri)
        conn.on('connected', () => {
            FileUploadBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName:'files'
            })
            ImageUploadBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName:'images'
            })
            resolve(conn)
        })
        conn.on('error', (err) => {
            reject(err)
        })
    })

}
const closeGridFSConnection = async () => {
    return await conn.close()
}

export { FileUploadBucket, ImageUploadBucket, connectGridFS, closeGridFSConnection}