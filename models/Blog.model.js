const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    Title: {type:String,required:true},
    Content: {type:String,required:true},
    Author: {type:String,required:true},
    Category: {type:String,required:true},
    Image: {type:String,required:true},
    UserId: {type:String,required:true}
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports = {BlogModel}