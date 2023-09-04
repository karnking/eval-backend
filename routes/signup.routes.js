const {
    Router
} = require('express')
const {
    UserModel
} = require('../models/User.model')
const jsonweb = require('jsonwebtoken')
const signupRouter = Router()
const bcrypt = require('bcryptjs')

signupRouter.post('/', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    const isUser = await UserModel.findOne({
        email: email
    })
    if (!isUser) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                const user = new UserModel({
                    name,
                    email,
                    password: hash
                })
                user.save()
            })
        })
        res.send({success:`User Signup successfull!`})
    } else {
        res.send({err:'User already registered'})
    }
})

module.exports = {
    signupRouter
}