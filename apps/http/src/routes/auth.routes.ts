import { Router } from 'express'
import { loginController } from '../controllers/auth/login.controller.js'
import { signUpController } from '../controllers/auth/signup.controller.js'

const authRoutes: Router = Router()

authRoutes.post('/login', loginController)
authRoutes.post('/signup', signUpController)

export { authRoutes }
