import { app } from '../App'
import supertest, { SuperAgentTest} from 'supertest'


describe('Server Endpoints', () : void => {
    it('GET /health should response with status and 200', async ()  => {
        const response  = await supertest(app)
            .get('/api/v1/health')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('status')
        expect(response.body.status).toEqual('UP')
    })
})
