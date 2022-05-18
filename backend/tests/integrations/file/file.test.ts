import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { isArrayOfString } from '../../utils/utils'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import { FILE_FIELD_NAME, IMAGES_FIELD_NAME } from '../../../src/config/fileUpload.config'
import profile from '../../utils/profile'
import mongoose from 'mongoose'
const pdfFilePath = '../assets/test-pdf.pdf'
const imageFilePath = '../assets/test-image.png'

let mongo : MongoMemoryReplSet = null

const config = {
    Authorization: ''
}
interface FileInfo{
    _id:mongoose.Types.ObjectId,
    length:number,
    chunkSize:number,
    uploadDate:Date,
    filename:string
}
describe('File API', () => {
    if (typeof process.env.JEST_TIMEOUT === 'number'){
        jest.setTimeout(process.env.JEST_TIMEOUT)
    }
    else{
        jest.setTimeout(30000)
    }

    beforeAll(async () : Promise<void> => {
        mongo = await MongoMemoryReplSet.create()
        await mongo.waitUntilRunning()
        const uri = mongo.getUri()
        await connectDB(uri)
        await connectGridFS(uri)

        const response = await supertest(app)
        .post(`${ContextPath}/auth/login`)
        .send({
            ...profile
        })
        const { body, statusCode} = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body).toHaveProperty('accessToken')
        config.Authorization = `Bearer ${body.accessToken}`
    })
    afterAll(async () : Promise<void> => {
        await disconnectDB()
        await closeGridFSConnection()
        await mongo.stop()
    })
    afterEach(async () : Promise<void> => {
        await clearDB(['users'])
    })
    it('Should return file info', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .set(config)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        const {body, statusCode} = documentResponse
        expect(statusCode).toBe(HttpStatus.OK)

        const fileInfoResponse = await supertest(app)
        .get(`${ContextPath}/file/${body.fileId}/info`)
        .set(config)
        expect(fileInfoResponse.body.length > 0).toBeTruthy()
        expect(fileInfoResponse.body.some((info : FileInfo) => info.filename === 'test-pdf.pdf')).toBeTruthy()

    })

    it('Should return file', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .set(config)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        const {body, statusCode} = documentResponse
        expect(statusCode).toBe(HttpStatus.OK)

        const fileResponse = await supertest(app)
        .get(`${ContextPath}/file/${body.fileId}`)
        .set(config)

        expect(fileResponse.statusCode).toBe(HttpStatus.OK)

    })

    it('Should return 400 Status code', async () => {
        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .set(config)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        const {body, statusCode} = documentResponse
        expect(statusCode).toBe(HttpStatus.OK)

        const fileInfoResponse = await supertest(app)
        .get(`${ContextPath}/file/${1234}/info`)
        .set(config)

        expect(fileInfoResponse.statusCode).toBe(HttpStatus.BAD_REQUEST)
    })

    it('Should return 404 Status code', async () => {
        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .set(config)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        const {body, statusCode} = documentResponse

        expect(statusCode).toBe(HttpStatus.OK)

        const fileInfoResponse = await supertest(app)
        .get(`${ContextPath}/file/${'686fa389138c88a2d3897a11'}/info`)
        .set(config)

        expect(fileInfoResponse.statusCode).toBe(HttpStatus.NOT_FOUND)
    })

    it('Should return 401 Status code', async () => {
        const fileInfoResponse = await supertest(app)
        .get(`${ContextPath}/file/${'686fa389138c88a2d3897a11'}/info`)
        expect(fileInfoResponse.statusCode).toBe(HttpStatus.UNAUTHORIZED)
    })

    it('Should upload images', async () => {
        const images = await supertest(app)
        .post(`${ContextPath}/file/upload/images`)
        .set(config)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        expect(images.statusCode).toBe(HttpStatus.CREATED)
        expect(images.body.length).toBeGreaterThan(0)
    })

    it('Should return image info', async () => {
        const images = await supertest(app)
        .post(`${ContextPath}/file/upload/images`)
        .set(config)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))

        const fileInfoResponse = await supertest(app)
        .get(`${ContextPath}/file/${images.body?.[0]}/info`)
        .set(config)

        expect(fileInfoResponse.body.length > 0).toBeTruthy()
        expect(fileInfoResponse.body.some((info : FileInfo) => info.filename === 'test-image.png')).toBeTruthy()
    })

    it('Should return image', async () => {
        const images = await supertest(app)
        .post(`${ContextPath}/file/upload/images`)
        .set(config)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))

        const fileResponse = await supertest(app)
        .get(`${ContextPath}/file/${images.body?.[0]}`)
        .set(config)

        expect(fileResponse.statusCode).toBe(HttpStatus.OK)
    })
})