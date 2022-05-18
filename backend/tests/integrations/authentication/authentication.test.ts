import supertest from 'supertest'
import { app, ContextPath} from '../../../App'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../../../src/utils/uploadsBucket'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { HttpStatus } from '../../../src/utils/HttpStatus.enum'
import jwt from 'jsonwebtoken'
import profile from '../../utils/profile'

let mongo : MongoMemoryReplSet = null

const config = {
    Authorization: ''
}

describe('Authentication API', () => {
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
    })
    afterAll(async () : Promise<void> => {
        await disconnectDB()
        await closeGridFSConnection()
        await mongo.stop()
    })
    afterEach(async () : Promise<void> => {
        await clearDB()
    })
    it('Should return JWT Token', async () => {

        const response = await supertest(app)
        .post(`${ContextPath}/auth/login`)
        .send({
            ...profile
        })
        const { body, statusCode } = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body).toHaveProperty('accessToken')
        expect(jwt.verify(body.accessToken, process.env.JWT_SECRET)).toHaveProperty('id')

    })
    it('Should return correct User', async () => {
        const response = await supertest(app)
        .post(`${ContextPath}/auth/login`)
        .send({
            ...profile
        })
        const {body, statusCode } = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body).toHaveProperty('accessToken')
        expect(jwt.verify(body.accessToken, process.env.JWT_SECRET)).toHaveProperty('id')
        config.Authorization = `Bearer ${body.accessToken}`

        const user = await supertest(app)
        .get(`${ContextPath}/me`)
        .set(config)
        expect(user.body).toHaveProperty('_id')
        expect(user.body.email).toEqual(profile.email)
        expect(user.body.firstName).toEqual(profile.firstName)
        expect(user.body.lastName).toEqual(profile.lastName)
    })

    it('Should return JWT Token for exist user', async () => {
        const response = await supertest(app)
        .post(`${ContextPath}/auth/login`)
        .send({
            ...profile
        })
        const { body, statusCode } = response
        expect(statusCode).toBe(HttpStatus.CREATED)
        expect(body).toHaveProperty('accessToken')

        const getJwt = await supertest(app)
        .post(`${ContextPath}/auth/login`)
        .send({
            ...profile
        })
        expect(getJwt.statusCode).toBe(HttpStatus.OK)
        expect(getJwt.body).toHaveProperty('accessToken')
        expect(jwt.verify(getJwt.body.accessToken, process.env.JWT_SECRET)).toHaveProperty('id')
    })
    it('Should return Unauthorized', async () => {
        const response = await supertest(app)
        .get(`${ContextPath}/me`)
        expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED)
    })
})