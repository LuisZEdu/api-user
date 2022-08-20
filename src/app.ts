import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { dataConnect } from './database/config/dataConnect'
import { IUser, User } from './database/models/User'


const app = express()
const port = process.env.PORT || 3333

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

dataConnect(() => {
    app.listen(port, () => {
        console.log('Aplicação rodando na porta ' + port)
    })
})

app.get('/', (req, res) => {
    res.send('Tudo funcionando.')
})

app.post('/cadastro', async (req, res) => {
    const { firtName, lastName, email, password }: IUser = req.body

    try {
        if (firtName && lastName && email && password) {
            const userData = await User.create({
                firtName,
                lastName,
                email,
                password
            })
            res.json('Usuário criado!' + userData)
            return
        }
    } catch (err) {
        console.log(err)
        res.json('Erro ao criar o usuário.')
        return
    }
})



