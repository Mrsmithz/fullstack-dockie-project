import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { isArrayOfString } from '../../utils/utils'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import { FILE_FIELD_NAME } from '../../../src/config/fileUpload.config'
const pdfFilePath = '../assets/test-pdf.pdf'
const imageFilePath = '../assets/test-image.png'

let mongo : MongoMemoryServer = null

describe('Post API Endpoints', () => {
    jest.setTimeout(20000)

    beforeAll(async () : Promise<void> => {
        mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()
        await connectDB(uri)
        await connectGridFS(uri)
    })
    afterAll(async () : Promise<void> => {
        await disconnectDB()
        await closeGridFSConnection()
        await mongo.stop()
    })
    afterEach(async () : Promise<void> => {
        await clearDB()
    })
    it('Should return document details', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        const {body, statusCode} = documentResponse
        expect(statusCode).toBe(HttpStatus.OK)
        expect(body).toHaveProperty('text')
        expect(body).toHaveProperty('title')
        expect(body).toHaveProperty('fileId')
        expect(body.text).toContain('OCR')
        expect(typeof body.fileId).toBe('string')
        expect(body.fileId).toHaveLength(24)
        expect(isArrayOfString(body.title)).toBeTruthy()

    })
})