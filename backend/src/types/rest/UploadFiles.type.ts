import { GridFile } from "multer-gridfs-storage"
import { Express } from "express"
export interface UploadFiles {
    file?:Express.Multer.File[],
    images?:Express.Multer.File[]
}