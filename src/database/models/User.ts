import { timeStamp } from "console"
import { Schema, Model, model } from "mongoose"

export interface IUser extends Document {
    firtName: string,
    lastName: string,
    email: string,
    password: string
}

const userSchema = new Schema<IUser>({
    firtName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true })

export const User: Model<IUser> = model('User', userSchema)