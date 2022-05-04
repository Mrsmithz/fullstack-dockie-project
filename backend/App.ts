import express, {Request, Response, NextFunction, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import PostRouter from './src/router/post.router'
import FileRouter from './src/router/file.router'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

// declare global {
//     namespace Express {
//       interface Request {
//         document?: Object,
//         documentFile?: File
//       }
//     }
//   }


export const ContextPath : String = '/api/v1';
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

app.use(`${ContextPath}/post`, PostRouter)

app.use(`${ContextPath}/file`, FileRouter)

app.get(`${ContextPath}/health`, (req : Request, res : Response, next : NextFunction) : Response => {
    return res.json({
        status:'UP'
    })
})

export { app }