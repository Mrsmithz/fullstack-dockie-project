import passport from 'passport'

const session = false
const isAuthenticated = passport.authenticate('jwt', { session })
export default isAuthenticated