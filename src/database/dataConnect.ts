import mongoose from "mongoose"

export const dataConnect = (callback: Function): void => {
    const mongoUri = process.env.MONGO_URI
    if (mongoUri) {
        mongoose.connect(mongoUri, {}, () => {
            console.log('Conectado ao banco de dados.')
            callback()
        })
    } else {
        console.log('Erro ao se conectar ao banco de dados.')
    }
}