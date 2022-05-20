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
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { createPrometheusExporterPlugin } from '@bmatei/apollo-prometheus-exporter'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})




export const ContextPath : String = process.env.CONTEXT_PATH ?? '/api/v1';

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// app.all('*', (req : Request, res : Response, next : NextFunction) : Response => {
//     if (req.headers.authorization !== process.env.API_KEY){
//         return res.sendStatus(401)
//     }
//     next()
// })

// app.use(`${ContextPath}/graphql`, isAuthenticated, graphqlHTTP((req : Request, res : Response) => {
//     return {
//         schema,
//         graphiql:true,
//         context:{
//             user: req.user
//         }
//     }
// }))
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
app.use(`${ContextPath}/graphql`, isAuthenticated)

const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground(),
        createPrometheusExporterPlugin({ app })
    ],
    context: ({ req }) => {
        return {
            user: req.user
        }
    }
})
apolloServer.start().then(()  => {
    apolloServer.applyMiddleware({
        app,
        path: `${ContextPath}/graphql`
    })
})
export { app }