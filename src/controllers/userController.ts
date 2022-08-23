import { Request, Response } from "express"
import { IUser, User } from "../database/models/User"
import bcrypt from 'bcrypt'


const index = async (req: Request, res: Response) => {

    const limit = Number(req.query.limit) || 10
    const skip = Number(req.query.skip) || 0

    try {
        const users = await User.find({}, { password: 0, rules: 0, createdAt: 0, updatedAt: 0, __v: 0 }).limit(limit).skip(skip)

        res.json({ message: users })
        return
    } catch (err) {
        console.log(err)
        res.json({ message: 'Error ao buscar dados.' })
    }
}

const show = async (req: Request, res: Response) => {
    res.json({ message: 'Rota em desenvolvimento.' })
}

const store = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: IUser = req.body

    try {
        if (firstName && lastName && email && password) {

            if (await User.findOne({ email })) return res.status(400).json({ message: 'E-mail já cadastrado.' })

            await User.create({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            })
            res.json({ message: 'Usuário cadastrado.' })
            return
        } else {
            res.status(400).json({ message: 'Verifique os dados e tente novamente.' })
            return
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar o usuário.' })
        return
    }
}

const update = async (req: Request, res: Response) => {
    res.json('Rota em desenvolvimento.')
}

const clear = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: 'ID do usuário não informado.' })

    try {
        await User.deleteOne({ _id: id })
        res.json({ message: 'Usuário deletado.' })
        return
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar o usuário.' })
        console.log(err)
        return
    }
}

export const userController = {
    index,
    show,
    store,
    update,
    clear,
}