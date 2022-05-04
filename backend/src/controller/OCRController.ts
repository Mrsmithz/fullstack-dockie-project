import { v1 } from '@google-cloud/documentai'
import fsPromises from 'fs/promises'
import { UploadFiles } from '../types/rest/UploadFiles.type'
import dotenv from 'dotenv'
import {Request, Response, NextFunction } from 'express'
import { fileUpload } from '../utils/fileUpload'
import {HttpStatus} from '../utils/HttpStatus.enum'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})
const projectId = process.env.PROJECT_ID
const location = process.env.PROJECT_LOCATION
const processorId = process.env.PROCESSOR_ID

const DocumentProcessor : any = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try{
        const uploads : UploadFiles = req.files as UploadFiles
        const file : Express.Multer.File =  uploads.file?.[0]
        const client : v1.DocumentProcessorServiceClient = new v1.DocumentProcessorServiceClient()
        const name : string = `projects/${projectId}/locations/${location}/processors/${processorId}`
        const imageFile : Buffer = await fsPromises.readFile(file.path)
        const encodedImage : string = Buffer.from(imageFile).toString('base64')

        const request = {
            name,
            rawDocument: {
            content: encodedImage,
            mimeType: file.mimetype,
            }
        }
        const [result] = await client.processDocument(request)
        const { document } = result
        const filteredTitle = document.text.match(/.+/g)
        const title = filteredTitle.slice(0, 10)
        const fileId = await fileUpload(file)

        res.status(HttpStatus.OK).send({
            title,
            text: document.text,
            fileId
        })

    }
    catch(err){
        console.log(err)
        res.sendStatus(HttpStatus.BAD_REQUEST)
        // throw new Error('OCR Failed')
    }
}

export { DocumentProcessor }