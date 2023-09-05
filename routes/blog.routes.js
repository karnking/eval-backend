const {Router} = require('express')
const { BlogModel } = require('../models/Blog.model')
const { ValidationMiddleware } = require('../middlewares/validation.middleware')
const blogRouter = Router()
const jwt = require('jsonwebtoken')
blogRouter.get('/', async(req,res)=>{
    try{
        const blogs = await BlogModel.find(req.query)
        res.send(blogs)
    }catch(error){
        res.send({err:"No blogs to show"})
        console.log(error)
    }
})

blogRouter.delete('/:blogID',async(req,res)=>{
    const blog = await BlogModel.findOne({_id:req.params.blogID})
    if(blog){
        const {UserId} = blog
        const token = req.headers.authorization.split(" ")[1]
        const {_id} = jwt.verify(token, 'sha1')
        console.log(UserId,_id)
        if(UserId==_id){
            await BlogModel.deleteOne({_id:req.params.blogID})
            res.send({success:"Blog deleted successfully"})
        }else{
            res.send({err:"Only blog creater can delete it"})
        }
    }else{
        res.send({err:"Blog id not found"})
    }
})

blogRouter.use(ValidationMiddleware)

blogRouter.post('/create',async(req,res)=>{
    const blog = new BlogModel(req.body)
    await blog.save()
    res.send("Blog posted successfully")
})

blogRouter.put('/:blogID',async(req,res)=>{
    const blog = await BlogModel.findOne({_id:req.params.blogID})
    if(blog){
        const {UserId} = blog
        const token = req.headers.authorization.split(" ")[1]
        const {_id} = jwt.verify(token, 'sha1')
        if(UserId==_id){
            await BlogModel.findOneAndUpdate({_id:req.params.blogID},req.body)
            res.send("Blog updated successfully")
        }else{
            res.send("Only blog creator can edit it")
        }
    }else{
        res.send("No such blog to update")
    }
})

module.exports = {blogRouter}