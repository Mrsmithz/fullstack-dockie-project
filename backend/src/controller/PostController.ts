import {Request, Response, NextFunction} from 'express'
import { UploadFiles } from '../types/rest/UploadFiles.type'
import { ICreatePost, IUpdatePost } from '../types/rest/post/RestPost.type'
import { Post } from '../model/Post'
import { IPost } from '../types/post/Post.type'
import { imageUpload } from '../utils/fileUpload'
import { HttpStatus } from '../utils/HttpStatus.enum'
import { User } from '../model/User'
import mongoose, {ClientSession} from 'mongoose'


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
            authorId:req.user._id,
            file: documentJSON.fileId,
            images: imageResult,
            document:{
                text: documentJSON.text,
                title: documentJSON.title
            }
        }
        let session : ClientSession = null
        try{
            session = await mongoose.startSession()
            session.startTransaction()
            const createdPost = await Post.create([ post ], { session })
            await User.updateOne({_id:post.authorId}, {
                $push : { posts : createdPost }
            }, { session })
            await session.commitTransaction()
            return res.status(HttpStatus.CREATED).send(createdPost)

        }
        catch(err){
            console.error(err)
            await session.abortTransaction()
            return res.status(HttpStatus.BAD_REQUEST)
        }
        finally{
            await session.endSession()
        }
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
const updatePost = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {

    const uploads = req.files as UploadFiles
    const {_id, images} = req.body as IUpdatePost
    req.body.images = JSON.parse(images)
    if (uploads.updateImages !== undefined){
        const imageResult = await imageUpload(uploads.updateImages)
        if (!(imageResult instanceof Error)){
            req.body.images.push(...imageResult)
        }
    }
    const updated = await Post.findByIdAndUpdate(_id, {
        $set: req.body,
    },
    {
        returnDocument:'after'
    })
    return res.status(HttpStatus.OK).send(updated)
}

export { createPost, updatePost }