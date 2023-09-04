const {
    Router
} = require('express')
const {
    UserModel
} = require('../models/User.model')
const bcrypt = require('bcryptjs')
const loginRouter = Router()
const jsonweb = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
    const {
        email,
        password
    } = req.body
    const isUser = await UserModel.findOne({
        email 
    })
    const sendRes = (message) =>{
        res.send(message)
    }
    if (isUser) {
        const {_id} = isUser
        let message = ""
        const a = await bcrypt.compare(password, isUser.password, function(err, res) {
            if(!res){
                sendRes({err:"Wrong password entered"})
                return;
            }
            const token = jsonweb.sign({
                _id
            }, "sha1")
            console.log(token)
            sendRes({success:token})
        })
    } else res.send({err:"User not found"})
})

module.exports = {
    loginRouter
}