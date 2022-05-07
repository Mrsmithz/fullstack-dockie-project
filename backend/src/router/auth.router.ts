import { Router } from "express"
import { signUp } from "../controller/AuthController"

const router : Router = Router()

router.post('/signup', signUp)

export default router