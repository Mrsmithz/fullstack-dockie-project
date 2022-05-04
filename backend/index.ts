import http from 'http'
import { app } from './App'
import { connectDB } from './src/utils/db'
import { connectGridFS } from './src/utils/uploadsBucket'
connectDB(process.env.MONGODB_URI).then(() => console.log('Connect MongoDB Success'))
connectGridFS(process.env.MONGODB_URI).then(() => console.log('Connect GridFS Success'))
const PORT = process.env.PORT || 8000

const httpServer : http.Server = http.createServer(app)

httpServer.listen(PORT, () : void => {
    console.log(`http server started at port ${PORT}`)
})

export { httpServer }
export default httpServer
