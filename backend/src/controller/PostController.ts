import {Request, Response, NextFunction} from 'express'
import { UploadFiles } from '../types/rest/UploadFiles.type'
import { ICreatePost } from '../types/rest/post/CreatePost.type'
import { Post } from '../model/Post'
import { IPost } from '../types/post/Post.type'
import { imageUpload } from '../utils/fileUpload'
import { HttpStatus } from '../utils/HttpStatus.enum'


const createPost = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
    const uploads = req.files as UploadFiles
    const {title, description, contact, status, document} = req.body as ICreatePost

    const imageResult = await imageUpload(uploads.images)

    if (imageResult instanceof Error){
        return res.status(HttpStatus.BAD_REQUEST).send({
            msg:imageResult
        })
    }
    if (typeof document === 'string'){
        const documentJSON = JSON.parse(document)
        const post : IPost = {
            title,
            description,
            contact,
            status,
            file: documentJSON.fileId,
            images: imageResult,
            document:{
                text: documentJSON.text,
                title: documentJSON.title
            }
        }
        const created = await Post.create(post)
        return res.status(HttpStatus.CREATED).send(created)
    }
    const post : IPost = {
        title,
        description,
        contact,
        status,
        file: document.fileId,
        images: imageResult,
        document:{
            text: document.text,
            title: document.title
        }
    }
    const created = await Post.create(post)
    return res.status(HttpStatus.CREATED).send(created)

}

export { createPost }