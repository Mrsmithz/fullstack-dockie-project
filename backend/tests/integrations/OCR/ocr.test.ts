import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { isArrayOfString } from '../../utils/utils'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import { FILE_FIELD_NAME } from '../../../src/config/fileUpload.config'
import profile from '../../utils/profile'
const pdfFilePath = '../assets/test-pdf.pdf'
const imageFilePath = '../assets/test-image.png'

let mongo : MongoMemoryReplSet = null

const config = {
    Authorization: ''
}

describe('OCR API', () => {
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
    it('Should return document details', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .set(config)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        const {body, statusCode} = documentResponse
        expect(statusCode).toBe(HttpStatus.OK)
        expect(body).toHaveProperty('text')
        expect(body).toHaveProperty('title')
        expect(body).toHaveProperty('fileId')
        expect(body.text).toContain('Initial System Requests')
        expect(typeof body.fileId).toBe('string')
        expect(body.fileId).toHaveLength(24)
        expect(isArrayOfString(body.title)).toBeTruthy()

    })
})