require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    // key/value object function
    isAuthenticated: (req, res, next) => {
        // checking if auth had the jw token
        const headerToken = req.get('Authorization')
        // if theres's no headertoken than console.log error and send status code
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            // re set the value to the actual token
            // verify uses secret to return actual token and set equal to token.
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            // it will stop any process below. Like return.
            throw err
        }
        // if token on line 16 is reassigned
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        // the same as the .then
        // Use when using middle wear
        next()
    }
}