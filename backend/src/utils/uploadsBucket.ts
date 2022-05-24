import mongoose from "mongoose"
import { GridFSBucket, GridFSFile} from "mongoose/node_modules/mongodb"
import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from "./HttpStatus.enum"

let FileUploadBucket : GridFSBucket
let ImageUploadBucket : GridFSBucket
let conn : mongoose.Connection

export const getFileUploadBucket = () => {
    return FileUploadBucket
}
export const getImageUploadBucket = () => {
    return ImageUploadBucket
}
export const connectGridFS = (uri : string) => {
    return new Promise((resolve, reject) => {
        conn = mongoose.createConnection(uri)
        conn.once('connected', () => {
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
export const closeGridFSConnection = async () => {
    return await conn.close()
}
const setDownloadableHeader = (res : Response, file : GridFSFile) => {
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`)
}

export const getGridFSFile = async (req : Request, res : Response) => {
    try{
        const fileId = new mongoose.Types.ObjectId(req.params?.id)
        const checkFiles = await getFileUploadBucket().find({_id : fileId}).toArray()
        if (checkFiles.length){
            setDownloadableHeader(res, checkFiles[0])
            return getFileUploadBucket().openDownloadStream(new mongoose.Types.ObjectId(fileId)).pipe(res)
        }
        const checkImages = await getImageUploadBucket().find({_id : fileId}).toArray()
        if (checkImages.length){
            return getImageUploadBucket().openDownloadStream(new mongoose.Types.ObjectId(fileId)).pipe(res)
        }
    }
    catch(e){
        console.log(e)
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
}
export const getGridFSFileInfo = async (req : Request, res : Response) => {
    try{
        const fileId = new mongoose.Types.ObjectId(req.params?.id)
        const files = await getFileUploadBucket().find({_id : fileId}).toArray()
        if (files.length){
            res.send(files)
        }
        const images = await getImageUploadBucket().find({_id : fileId}).toArray()
        if (images.length){
            res.send(images)
        }
    }
    catch(e){
        console.log(e)
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
}

export const isFileExist = async (req : Request, res : Response, next : NextFunction) => {
    if (!mongoose.isValidObjectId(req.params?.id)){
        return res.status(HttpStatus.BAD_REQUEST).send({
            message:'id is invalid'
        })
    }
    try{
        const fileId = new mongoose.Types.ObjectId(req.params?.id)
        const checkFiles = await getFileUploadBucket().find({_id : fileId}).toArray()
        const checkImages = await getImageUploadBucket().find({_id : fileId}).toArray()
        if (!checkFiles.length && !checkImages.length){
            return res.status(HttpStatus.NOT_FOUND).send({
                message:'file not found'
            })
        }
        next()
    }
    catch(e){
        console.log(e)
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
}
