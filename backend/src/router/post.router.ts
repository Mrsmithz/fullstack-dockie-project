import { Router } from "express"
import { graphqlHTTP } from "express-graphql"
import PostSchema from '../model/Post'
import { createPost } from '../controller/PostController'
import { uploadImages } from "../middlewares/multerUpload"

const router : Router = Router()

router.post('/create', uploadImages, createPost)
router.use('/', graphqlHTTP({
    schema:PostSchema,
    graphiql:true
}))

export default router