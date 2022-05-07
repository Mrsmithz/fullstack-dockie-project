import jwt from 'passport-jwt'
import passport from 'passport'
const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.JWT_SECRET,
    // issuer: 'test.dev.com',
    // audience: 'test.dev.com',
    // algorithms: ['HS256']
}

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log(jwt_payload)
    return done(null, jwt_payload)
}))

