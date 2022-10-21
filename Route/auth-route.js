const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const token = req.header('auth-token')
    if(!token) return res.send('access denied')
    try {
        const verified = jwt.verify(token, process.env.USER_KEY)
        req.user = verified
        next()
    } catch (error) {
        res.send('invalid token')
    }
}