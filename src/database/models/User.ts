import { Schema, Model, model } from "mongoose"

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true, minlength: 4, maxlength: 15, lowercase: true },
    lastName: { type: String, required: true, minlength: 4, maxlength: 15 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
}, { timestamps: true })

export const User: Model<IUser> = model('User', userSchema)