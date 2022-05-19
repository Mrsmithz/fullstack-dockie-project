import { JwtPayload } from 'jsonwebtoken'
import { Schema } from 'mongoose'
import CustomUser from './user/User.type'
declare global {
    namespace Express {
      interface User extends CustomUser{

      }
    }
  }

export interface IJwtUserPayload extends JwtPayload {
    _id: Schema.Types.ObjectId
}
export interface IGraphqlContext {
    user: IJwtUserPayload
}