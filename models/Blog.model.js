const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    Title: String,
    Content: String,
    Author: String,
    Category: String,
    Image: String,
    UserId: String
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports = {BlogModel}