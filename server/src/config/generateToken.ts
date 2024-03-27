import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET || '', {
        expiresIn: '30d',
    })
}
