import { getFileUploadBucket, getImageUploadBucket } from "./uploadsBucket"
import fs from 'fs'
import fsPromises from 'fs/promises'
import mongoose from "mongoose"
const fileUpload = async (file: Express.Multer.File): Promise<mongoose.Types.ObjectId | Error> => {
    return new Promise(async (resolve, reject) => {
        const result = fs.createReadStream(file.path)
            .pipe(getFileUploadBucket().openUploadStream(file.originalname))
        result.on('error', async (error) => {
            await fsPromises.rm(file.path)
            console.log(`Delete ${file.originalname} from system`)
            reject(error)
        })
        result.on('finish', async () => {
            await fsPromises.rm(file.path)
            console.log(`Delete ${file.originalname} from system`)
            resolve(new mongoose.Types.ObjectId(result.id))
        })

    })
}

const imageUpload = async (files: Express.Multer.File[]): Promise<mongoose.Types.ObjectId[] | Error> => {
    let arr = []
    for (let file of files){
        arr.push(uploadSingleImage(file))
    }
    return Promise.all(arr)
}
const uploadSingleImage = (file: Express.Multer.File) => {
    return new Promise(async (resolve, reject) => {
        const result = fs.createReadStream(file.path)
            .pipe(getImageUploadBucket().openUploadStream(file.originalname))
        result.on('error', async (error) => {
            await fsPromises.rm(file.path)
            console.log(`Delete ${file.originalname} from system`)
            reject(error)
        })
        result.on('finish', async () => {
            await fsPromises.rm(file.path)
            console.log(`Delete ${file.originalname} from system`)
            resolve(new mongoose.Types.ObjectId(result.id))
        })
    })
}

export { fileUpload, imageUpload }