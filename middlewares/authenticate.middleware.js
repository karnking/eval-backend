const jwt = require('jsonwebtoken')
const AuthenticateMiddleware = async(req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            const _id = jwt.verify(token, 'sha1')
            console.log(_id)
            next()
        }else{
            console.log("here")
            res.status(400).send({err:"Not Logged in yet"})
        }
    }
    else{
        res.status(400).send({err:"Not Logged in yet"})
    }
}
module.exports = {AuthenticateMiddleware}