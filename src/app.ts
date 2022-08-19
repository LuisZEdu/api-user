import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { dataConnect } from './database/dataConnect'

const app = express()
const port = process.env.PORT || 3333

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors)

//Conecta ao banco de dados e inicia o servidor express.
dataConnect(() => {
    app.listen(port, () => {
        console.log(`Aplicação rodando na porta ${port}.`)
    })
})



