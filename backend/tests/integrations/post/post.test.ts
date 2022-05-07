import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { Status } from '../../../src/types/post/Status.enum'
import { ICreatePost } from '../../../src/types/rest/post/RestPost.type'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { isArrayOfString } from '../../utils/utils'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import { FILE_FIELD_NAME, IMAGES_FIELD_NAME, UPDATE_IMAGES_FIELD_NAME} from '../../../src/config/fileUpload.config'
const pdfFilePath = '../assets/test-pdf.pdf'
const imageFilePath = '../assets/test-image.png'

let mongo : MongoMemoryServer = null

describe('Post API Endpoints', () => {
    jest.setTimeout(30000)

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
    it('Should Create Post', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        expect(documentResponse.statusCode).toBe(HttpStatus.OK)

        const post : ICreatePost = {
            title: 'test create post',
            status: Status.PRIVATE,
            document: documentResponse.body
        }

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('title', post.title)
        .field('status', post.status)
        .field('document', JSON.stringify(post.document))
        const { body, statusCode} = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body.title).toEqual(post.title)
        expect(body.status).toEqual(post.status)
        expect(typeof body.file).toBe('string')
        expect(isArrayOfString(body.images)).toBeTruthy()
        expect(body.document).toHaveProperty('text')
        expect(isArrayOfString(body.document.title)).toBeTruthy()
    })
    it('Should return created post', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        expect(documentResponse.statusCode).toBe(HttpStatus.OK)

        const post : ICreatePost = {
            title: 'test create post',
            status: Status.PRIVATE,
            document: documentResponse.body
        }

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('title', post.title)
        .field('status', post.status)
        .field('document', JSON.stringify(post.document))
        const { body, statusCode} = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body.title).toEqual(post.title)
        expect(body.status).toEqual(post.status)
        expect(typeof body.file).toBe('string')
        expect(isArrayOfString(body.images)).toBeTruthy()
        expect(body.document).toHaveProperty('text')
        expect(isArrayOfString(body.document.title)).toBeTruthy()

        const fetchPost = await supertest(app)
        .post(`${ContextPath}/post/`)
        .send({
            query: '{ post { title }}'
        })
        const responseBody = fetchPost.body
        expect(responseBody.data.post.title).toEqual(post.title)
    })
    it('Should return total post', async () => {
        const totalPost = 2
        for (let i = 0; i < totalPost; i++){
            const documentResponse = await supertest(app)
            .post(`${ContextPath}/file/ocr`)
            .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
            expect(documentResponse.statusCode).toBe(HttpStatus.OK)

            const post : ICreatePost = {
                title: 'test create post',
                status: Status.PRIVATE,
                document: documentResponse.body
            }

            const response = await supertest(app)
            .post(`${ContextPath}/post/create`)
            .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
            .field('title', post.title)
            .field('status', post.status)
            .field('document', JSON.stringify(post.document))
            const { body, statusCode} = response
            expect(statusCode).toBe(201)
            expect(body.title).toEqual(post.title)
            expect(body.status).toEqual(post.status)
            expect(typeof body.file).toBe('string')
            expect(isArrayOfString(body.images)).toBeTruthy()
            expect(body.document).toHaveProperty('text')
            expect(isArrayOfString(body.document.title)).toBeTruthy()
        }

        const fetchPost = await supertest(app)
        .post(`${ContextPath}/post/`)
        .send({
            query: '{ postCount }'
        })
        const responseBody = fetchPost.body
        expect(responseBody.data.postCount).toEqual(totalPost)
    })
    it('Should Update Post Images', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        expect(documentResponse.statusCode).toBe(HttpStatus.OK)

        const post : ICreatePost = {
            title: 'test create post',
            status: Status.PRIVATE,
            document: documentResponse.body
        }

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('title', post.title)
        .field('status', post.status)
        .field('document', JSON.stringify(post.document))
        const { body, statusCode} = response
        expect(statusCode).toBe(HttpStatus.CREATED)

        const updated = await supertest(app)
        .put(`${ContextPath}/post/update`)
        .attach(UPDATE_IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('_id', body._id)
        .field('images', JSON.stringify([]))
        expect(updated.statusCode).toBe(HttpStatus.OK)
        expect(isArrayOfString(updated.body.images)).toBeTruthy()

        const oldImages = body.images as string[]
        const newImages = updated.body.images as string[]
        expect(oldImages.some(el => newImages.indexOf(el) >= 0)).toBeFalsy()
    })
})