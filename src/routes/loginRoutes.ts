import { Router } from "express"

import { loginController } from '../controllers/loginController'

export const loginRoutes = Router()

loginRoutes.post('/login', loginController.login)