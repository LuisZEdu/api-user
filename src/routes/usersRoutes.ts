import { Router } from 'express'

import { userController } from '../controllers/userController'
import { verifyToken } from '../middleware/verifyToken'

export const usersRoutes = Router()

usersRoutes.get('/user', userController.index)
usersRoutes.get('/user/:id', userController.show)
usersRoutes.post('/user', userController.store)
usersRoutes.put('/user/:id', userController.update)
usersRoutes.delete('/user/:id?', userController.clear)


