import { Router } from 'express'

import { userController } from '../controllers/userController'
import { verifyRules } from '../middleware/verifyRules'
import { verifyToken } from '../middleware/verifyToken'

export const usersRoutes = Router()

usersRoutes.get('/user', verifyToken.jwtVerify, verifyRules.rules, userController.index)
usersRoutes.get('/user/:id?', userController.show)
usersRoutes.post('/user', userController.store)
usersRoutes.put('/user/:id', userController.update)
usersRoutes.delete('/user/:id?', userController.clear)


