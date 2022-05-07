import { app } from '../App'
import supertest, { SuperAgentTest} from 'supertest'
import {ContextPath} from '../App'
import {HttpStatus} from '../src/utils/HttpStatus.enum'
describe('Server Endpoints', () : void => {
    it('GET /health should response with status 200', async ()  => {
        const response  = await supertest(app)
            .get(`${ContextPath}/health`)
        expect(response.statusCode).toBe(HttpStatus.OK)
        expect(response.body).toHaveProperty('status')
        expect(response.body.status).toEqual('UP')
    })
})
