import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../database/models/User"

const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
    const secretKey = process.env.SECRET_JWT

    const authorization = req.headers.authorization
    const token = authorization?.split(' ').splice(-1, 1).toString()

    try {
        if (secretKey && token) {
            const data = jwt.verify(token, secretKey) as JwtPayload
            
            const { firstName, lastName, email } = data
    
            const user = User.findOne({ firstName, lastName, email })
    
            if (!user) return res.json({ message: 'Usuário é inválido.' })
    
            req.body.firstName = firstName
            req.body.lastName = lastName
            req.body.email = email
            next()
            return
        } else {
            res.json({ message: 'Dados incorretos.' })
        }
    } catch (err) {
        res.json({ message: 'Token inválido.' })
        return
    }
}

export const verifyToken = {
    jwtVerify
}