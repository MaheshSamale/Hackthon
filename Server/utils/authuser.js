const jwt = require('jsonwebtoken')
const result = require('./result')
const config = require('./config')

function authorizeUser(req, res, next) {
    const url = req.url
    if (url =='/user/login' || url =='/user/register' || url == '/category/add' || url == '/category/all' || url == '/category/delete' ){
        next()
    }
    else {
        const token = req.headers.token
        console.log(token)
        if (token) {
            try {
                const payload = jwt.verify(token, config.SECRET)
                console.log(payload)
                req.headers.user_id = payload.user_id
                console.log(payload.user_id)
                console.log(req.headers.user_id)
                next()
            } catch (ex) {
                res.send(result.createResult('Invalid Token'))
            }
        } else
            res.send(result.createResult('Token is Missing'))
    }
}

module.exports = authorizeUser