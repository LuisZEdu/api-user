import { Schema, Model, model } from "mongoose"
import validator from 'validator'

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    rules?: String
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true, minlength: 4, maxlength: 15, lowercase: true },
    lastName: { type: String, required: true, minlength: 4, maxlength: 15, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, 'E-mail inválido.'] },
    password: { type: String, required: true },
    rules: { type: String, default: 'common' }
}, { timestamps: true })

export const User: Model<IUser> = model('User', userSchema)