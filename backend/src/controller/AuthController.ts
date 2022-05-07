import {Request, Response, NextFunction} from 'express'
import { ISignup } from '../types/rest/user/SignUp.type'
import { User } from '../model/User'
import { HttpStatus } from '../utils/HttpStatus.enum'
import { generateJwtToken } from '../utils/jwtUtils'
export const signUp = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
    const {firstName, lastName, email, image} : ISignup = req.body
    const user = await User.findOne({email})
    if (user){
        const token = generateJwtToken(user._id)
        return res.status(HttpStatus.OK).send({
            accessToken:token
        })
    }
    if (!user){
        const newUser = await User.create({firstName, lastName, email, image})
        const token = generateJwtToken(newUser._id)
        return res.status(HttpStatus.CREATED).send({
            accessToken:token
        })
    }
}