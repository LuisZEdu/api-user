import { Request, Response } from "express"
import { IUser, User } from "../database/models/User"
import bcrypt from 'bcrypt'


const index = async (req: Request, res: Response) => {

    const limit = Number(req.query.limit) || 10
    const skip = Number(req.query.skip) || 0

    try {
        const users = await User.find({}, {
            password: 0,
            rules: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }).limit(limit).skip(skip)

        const count = await User.count()

        res.json({ message: users, totalDocuments: count })

        return
    } catch (err) {
        console.log(err)
        res.json({ message: 'Error ao buscar dados.' })
    }
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
    const { id } = req.params //ID do Usuário a ser alterado
    const { email } = req.body.dataUser //O usuário que está tentando fazer o update para fins de identificação de prmissões.

    const newFirstName = req.body.firstName
    const newLastName = req.body.lastName
    const newPassword = req.body.password

    if (!newFirstName && !newLastName && !newPassword) return res.status(400).json({ message: 'Dados necessários não informados.' })

    try {
        /*Buscar o usuário que está tentando realizar o update para identificar sé é um admin
        ou se usuário está tentando alterar os próprios dados.*/
        const user = await User.findOne({ email }, {
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })

        if (user?.rules === 'admin' || user?._id.toString() === id) {
            await User.findOneAndUpdate({ _id: id }, {
                firstName: newFirstName,
                lastName: newFirstName,
                password: await bcrypt.hash(newPassword, 10)
            })
            res.json({ message: 'Dados alterados com sucesso.' })
            return
        } else {
            res.status(400).json({ message: 'Você não está autorizado a alterar os dados.' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Erro ao alterar os dados.' })
    }
}

const clear = async (req: Request, res: Response) => {
    const { id } = req.params //ID do Usuário a ser deletado.
    const { email } = req.body.dataUser //O usuário que está tentando fazer o delete para fins de identificação de prmissões.

    if (!id) return res.status(400).json({
        message: 'Dados necessários não informados.'
    })

    try {
        /*Buscar o usuário que está tentando realizar o delete para identificar sé é um admin
        ou se usuário está tentando alterar os próprios dados.*/
        const user = await User.findOne({ email }, {
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })

        if (user?.rules === 'admin' || user?._id.toString() === id) {
            await User.deleteOne({ _id: id })
            res.json({ message: 'Usuário deletado.' })
            return
        } else {
            res.status(401).json({ message: 'Você não está autorizado a alterar os dados.' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar o usuário.' })
    }
}

export const userController = {
    index,
    store,
    update,
    clear,
}