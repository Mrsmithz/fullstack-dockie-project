import jwt from 'jsonwebtoken'

export const generateJwtToken = (id : String) : string => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {expiresIn:'7d'})
    return token
}