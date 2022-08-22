import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { dataConnect } from './database/config/dataConnect'
import { usersRoutes } from './routes/usersRoutes'
import { loginRoutes } from './routes/loginRoutes'


const app = express()
const port = process.env.PORT || 3333

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rotas
app.use(usersRoutes)
app.use(loginRoutes)

dataConnect(() => {
    app.listen(port, () => {
        console.log('Aplicação rodando na porta ' + port)
    })
})


