import { Router } from "express"
import { graphqlHTTP } from "express-graphql"
import PostSchema from '../model/Post'
import { createPost, updatePost } from '../controller/PostController'
import { uploadImages, uploadUpdateImages} from "../middlewares/multerUpload"
const router : Router = Router()

router.post('/create', uploadImages, createPost)
router.put('/update', uploadUpdateImages, updatePost)
router.use('/', graphqlHTTP({
    schema:PostSchema,
    graphiql:true
}))

export default router