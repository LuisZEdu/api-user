import { Request, Response, NextFunction } from "express"
import { User } from "../database/models/User"

const rules = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email } = req.body.dataUser

    try {
        const user = await User.findOne({ firstName, lastName, email })

        if (user?.rules === 'admin') {
            next()
        } else {
            res.status(401).json({ message: 'Não autorizado.' })
            return
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro interno durante validação.' })
        return
    }
}

export const verifyRules = {
    rules
}