const express = require('express')
const { connection } = require('./config/db')
const { signupRouter } = require('./routes/signup.routes')
const { loginRouter } = require('./routes/login.routes')
const { AuthenticateMiddleware } = require('./middlewares/authenticate.middleware')
const { blogRouter } = require('./routes/blog.routes')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("base endpoint")
})
app.use('/signup',signupRouter)
app.use('/login',loginRouter)
app.use("/blogs",AuthenticateMiddleware,blogRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connection successfull")
    }catch(error){
        console.log("Connection unsucessfull")
        console.log(error)
    }
})