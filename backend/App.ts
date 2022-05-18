import express, {Request, Response, NextFunction, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import PostRouter from './src/router/post.router'
import FileRouter from './src/router/file.router'
import AuthRouter from './src/router/auth.router'
import schema from './src/graphql/index'
import './src/auth-strategy/jwtStrategy'
import isAuthenticated from './src/middlewares/isAuthenticated'
import { graphqlHTTP } from 'express-graphql'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})




export const ContextPath : String = process.env.CONTEXT_PATH ?? '/api/v1';

const app : Application = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// app.all('*', (req : Request, res : Response, next : NextFunction) : Response => {
//     if (req.headers.authorization !== process.env.API_KEY){
//         return res.sendStatus(401)
//     }
//     next()
// })

app.use(`${ContextPath}/graphql`, graphqlHTTP((req : Request, res : Response) => {
    return {
        schema,
        graphiql:true,
        context:{
            user: req.user
        }
    }
}))
app.use(`${ContextPath}/post`, isAuthenticated, PostRouter)

app.use(`${ContextPath}/file`, isAuthenticated, FileRouter)

app.use(`${ContextPath}/auth`, AuthRouter)

app.get(`${ContextPath}/health`, (req : Request, res : Response, next : NextFunction) : Response => {
    return res.json({
        status:'UP'
    })
})

app.get(`${ContextPath}/me`, isAuthenticated, (req, res, next) => {
    res.send(req.user)
})
export { app }