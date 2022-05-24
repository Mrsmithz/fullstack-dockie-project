import { Schema, model } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { IDownload } from '../types/download/download.type'

const DownloadSchema = new Schema({
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {timestamps : true})

const Download = model<IDownload>('Download', DownloadSchema)
const customizationOptions = {}
const DownloadTC = composeMongoose(Download, customizationOptions)
export { Download, DownloadTC }