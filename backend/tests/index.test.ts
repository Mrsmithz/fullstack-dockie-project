import { app } from '../App'
import supertest, { SuperAgentTest} from 'supertest'
import {ContextPath} from '../App'
import {HttpStatus} from '../src/utils/HttpStatus.enum'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import {connectDB, disconnectDB, clearDB} from '../src/utils/db'
import { connectGridFS, closeGridFSConnection} from '../src/utils/uploadsBucket'
let mongo : MongoMemoryReplSet = null

describe('Server Health Test', () : void => {
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

    it('GET /health should response with status 200', async ()  => {
        const response  = await supertest(app)
            .get(`${ContextPath}/health`)
        expect(response.statusCode).toBe(HttpStatus.OK)
        expect(response.body).toHaveProperty('status')
        expect(response.body.status).toEqual('UP')
    })
})
