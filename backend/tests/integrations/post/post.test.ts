import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { Status } from '../../../src/types/post/Status.enum'
import { ICreatePost } from '../../../src/types/rest/post/RestPost.type'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { isArrayOfString } from '../../utils/utils'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import { FILE_FIELD_NAME, IMAGES_FIELD_NAME, UPDATE_IMAGES_FIELD_NAME} from '../../../src/config/fileUpload.config'
import profile from '../../utils/profile'
import mongoose from 'mongoose'
const pdfFilePath = '../assets/test-pdf.pdf'
const imageFilePath = '../assets/test-image.png'

let mongo : MongoMemoryReplSet = null
const config = {
    Authorization: ''
}
const mockPost : ICreatePost = {
    title: 'test create post',
    status: Status.PRIVATE,
    document: null
}
let createdPost = null
describe('Post API', () => {

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
    beforeEach(async () : Promise<void> => {

        const documentResponse = await supertest(app)
        .post(`${ContextPath}/file/ocr`)
        .set(config)
        .attach(FILE_FIELD_NAME, path.join(__dirname, pdfFilePath))
        mockPost.document = documentResponse.body

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .set(config)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('title', mockPost.title)
        .field('status', mockPost.status)
        .field('document', JSON.stringify(mockPost.document))
        const { statusCode } = response
        const [ body ] = response.body
        expect(statusCode).toBe(HttpStatus.CREATED)
        createdPost = body

    })
    it('Should Create Post', async () => {

        const response = await supertest(app)
        .post(`${ContextPath}/post/create`)
        .set(config)
        .attach(IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('title', mockPost.title)
        .field('status', mockPost.status)
        .field('document', JSON.stringify(mockPost.document))
        const { statusCode } = response
        const [ body ] = response.body
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body.title).toEqual(mockPost.title)
        expect(body.status).toEqual(mockPost.status)
        expect(typeof body.file).toBe('string')
        expect(isArrayOfString(body.images)).toBeTruthy()
        expect(body.document).toHaveProperty('text')
        expect(isArrayOfString(body.document.title)).toBeTruthy()

        const user = await supertest(app)
        .get(`${ContextPath}/me`)
        .set(config)
        expect(user.body).toHaveProperty('_id')
        expect(user.body.posts.some((el : string) => el === body._id)).toBeTruthy()
    })
    it('Should return created post', async () => {

        const fetchPost = await supertest(app)
        .post(`${ContextPath}/graphql`)
        .set(config)
        .send({
            query: '{ post { title }}'
        })
        const responseBody = fetchPost.body
        expect(responseBody.data.post.title).toEqual(mockPost.title)
    })
    it('Should return total post', async () => {
        const fetchPost = await supertest(app)
        .post(`${ContextPath}/graphql`)
        .set(config)
        .send({
            query: '{ postCount }'
        })
        const responseBody = fetchPost.body
        expect(responseBody.data.postCount).toEqual(1)
    })
    it('Should Update Post Images', async () => {

        const updated = await supertest(app)
        .put(`${ContextPath}/post/update`)
        .set(config)
        .attach(UPDATE_IMAGES_FIELD_NAME, path.join(__dirname, imageFilePath))
        .field('_id', createdPost._id)
        .field('images', JSON.stringify([]))
        expect(updated.statusCode).toBe(HttpStatus.OK)
        expect(isArrayOfString(updated.body.images)).toBeTruthy()

        const oldImages = createdPost.images as string[]
        const newImages = updated.body.images as string[]
        expect(oldImages.some(el => newImages.indexOf(el) >= 0)).toBeFalsy()
    })

    it('Should Update Post Title', async () => {

        const newTitle = 'title updated'
        const mutation = `
            mutation updatePost{
                updatePostById(_id : "${createdPost._id}", title : "${newTitle}" ) {
                    title
                }
            }
        `
        const updated = await supertest(app)
        .post(`${ContextPath}/graphql`)
        .set(config)
        .send({
            query:mutation
        })
        expect(updated.statusCode).toBe(HttpStatus.OK)
        expect(updated.body.data.updatePostById.title).toEqual(newTitle)
    })
})