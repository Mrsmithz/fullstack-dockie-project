import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import path from 'path'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { Status } from '../../../src/types/post/Status.enum'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import jwt from 'jsonwebtoken'
import profile from '../../utils/profile'
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
    it('Should return JWT Token and create user', async () => {

        const response = await supertest(app)
        .post(`${ContextPath}/auth/signup`)
        .send({
            ...profile
        })
        const { body, statusCode} = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body).toHaveProperty('accessToken')
        expect(jwt.verify(body.accessToken, process.env.JWT_SECRET)).toHaveProperty('id')

    })
})