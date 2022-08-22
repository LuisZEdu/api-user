import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "../database/models/User"

const login = async (req: Request, res: Response) => {

    const jwtSecretKey = process.env.SECRET_JWT

    if (jwtSecretKey) {

        //Coleta o nome e senha do usuário enviado na requisição
        const emailUserRequest: string = req.body.email
        const passwordHash: string = req.body.password

        //Busca no banco o usuário
        const userData = await User.findOne({ email: emailUserRequest })
    
        //Verifica se o usuário informado existe e se a senha informada está correta
        if (!userData) return res.status(400).json({ message: 'Usuário não existe.' })
        if (!await bcrypt.compare( passwordHash, userData.password )) return res.status(400).json({ message: 'Senha inválida.' })
    
        const { firstName, lastName, email } = userData

        //Gera o token do usuário
        const token = jwt.sign({ firstName, lastName, email }, jwtSecretKey, { expiresIn: 300 })

        res.json({ message: { token, firstName, lastName, email } })

        return

    } else {
        res.status(500).json({ message: 'Não foi possível realizar o login.' })
        return
    }
}

export const loginController = {
    login,
}