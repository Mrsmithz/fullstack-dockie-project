import { Router } from "express"
import { login } from "../controller/AuthController"

const router : Router = Router()

router.post('/login', login)

export default router