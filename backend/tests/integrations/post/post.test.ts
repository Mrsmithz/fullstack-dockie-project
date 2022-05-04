import supertest, { SuperAgentTest} from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { Status } from '../../../src/types/post/Status.enum'
import { ICreatePost } from '../../../src/types/rest/post/CreatePost.type'
import { MongoMemoryServer } from 'mongodb-memory-server'
const pdfFilePath = '../assets/test-pdf.pdf'
const imageFilePath = '../assets/test-image.png'
const isArrayOfString = (arr : []) => {
    return arr.every(el => typeof el === 'string')
}
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
    it('Should Create Post', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .attach('file', path.join(__dirname, pdfFilePath))
        expect(documentResponse.statusCode).toBe(200)

        const post : ICreatePost = {
            title: 'test create post',
            status: Status.PRIVATE,
            document: documentResponse.body
        }

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .attach('images', path.join(__dirname, imageFilePath))
        .field('title', post.title)
        .field('status', post.status)
        .field('document', JSON.stringify(post.document))
        const { body, statusCode} = response
        expect(statusCode).toBe(201)
        expect(body.title).toEqual(post.title)
        expect(body.status).toEqual(post.status)
        expect(typeof body.file).toBe('string')
        expect(isArrayOfString(body.images)).toBe(true)
        expect(body.document).toHaveProperty('text')
        expect(isArrayOfString(body.document.title)).toBe(true)
    })
    it('Should return created post', async () => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .attach('file', path.join(__dirname, pdfFilePath))
        expect(documentResponse.statusCode).toBe(200)

        const post : ICreatePost = {
            title: 'test create post',
            status: Status.PRIVATE,
            document: documentResponse.body
        }

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .attach('images', path.join(__dirname, imageFilePath))
        .field('title', post.title)
        .field('status', post.status)
        .field('document', JSON.stringify(post.document))
        const { body, statusCode} = response
        expect(statusCode).toBe(201)
        expect(body.title).toEqual(post.title)
        expect(body.status).toEqual(post.status)
        expect(typeof body.file).toBe('string')
        expect(isArrayOfString(body.images)).toBe(true)
        expect(body.document).toHaveProperty('text')
        expect(isArrayOfString(body.document.title)).toBe(true)

        const fetchPost = await supertest(app)
        .post(`${ContextPath}/post/`)
        .send({
            query: '{ post { title }}'
        })
        const responseBody = fetchPost.body
        expect(responseBody.data.post.title).toEqual(post.title)
    })
    it('Should return total post', async () => {
        for (let i = 0; i < 2; i++){
            const documentResponse = await supertest(app)
            .post(`${ContextPath}/file/ocr`)
            .attach('file', path.join(__dirname, pdfFilePath))
            expect(documentResponse.statusCode).toBe(200)

            const post : ICreatePost = {
                title: 'test create post',
                status: Status.PRIVATE,
                document: documentResponse.body
            }

            const response = await supertest(app)
            .post(`${ContextPath}/post/create`)
            .attach('images', path.join(__dirname, imageFilePath))
            .field('title', post.title)
            .field('status', post.status)
            .field('document', JSON.stringify(post.document))
            const { body, statusCode} = response
            expect(statusCode).toBe(201)
            expect(body.title).toEqual(post.title)
            expect(body.status).toEqual(post.status)
            expect(typeof body.file).toBe('string')
            expect(isArrayOfString(body.images)).toBe(true)
            expect(body.document).toHaveProperty('text')
            expect(isArrayOfString(body.document.title)).toBe(true)
        }

        const fetchPost = await supertest(app)
        .post(`${ContextPath}/post/`)
        .send({
            query: '{ postCount }'
        })
        const responseBody = fetchPost.body
        expect(responseBody.data.postCount).toEqual(2)
    })
})