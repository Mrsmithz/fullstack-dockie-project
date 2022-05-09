import jwt from 'passport-jwt'
import passport from 'passport'
const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt
import { User } from '../model/User'
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    // issuer: 'test.dev.com',
    // audience: 'test.dev.com',
    // algorithms: ['HS256']
}

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    if (jwt_payload?.id){
        const user = await User.findById(jwt_payload.id)
        return done(null, user)
    }
    return done(null, false)
}))

