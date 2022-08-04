const Blog = require("../models/blogModel") ;
const AppError = require("../utils/appError");
const fs = require('fs') ;

exports.saveBlog = async ( req, res , next) => {

    const { blog_title, blog_description, sections, folder_id } = req.body ;
    const auth_user = req.user ;

    let blog = await Blog.create({
        title : blog_title,
        description : blog_description,
        sections : sections,
        folder_id : folder_id,
        user_id : req.user._id
    }) ;

    if(!blog) return next(new AppError(403, "fail", "blog create fail")) ;

    res.status(200).json({
        status : "success",
        message : "blog create success",
    })
}

exports.listBlog = async (req, res, next) => {

    let blogs = await Blog.find({}).populate('user_id').sort({createdAt : 1}) ;

    res.status(200).json({
        status : 'success',
        blogs : blogs
    }) ;
}

exports.userBlogs = async (req, res, next) => {

    let blogs = await Blog.find({user_id : req.user._id}).populate('user_id').sort({createdAt : 1}) ;

    res.status(200).json({
        status : 'success',
        blogs : blogs
    }) ;
}

exports.updateBlog = async ( req, res , next) => {

    const { blog_title, blog_description, sections, blog_id } = req.body ;

    let blog = await Blog.updateOne({_id : blog_id}, {
        title : blog_title,
        description : blog_description,
        sections : sections,
    }) ;

    if(!blog) return next(new AppError(403, "fail", "blog create fail")) ;

    res.status(200).json({
        status : "success",
        message : "blog update success",
    })
}

exports.uploadImage = async (req, res, next) => {
    res.status(200).json({
        s3Url : 'http://10.10.10.186:5050/api/files/blogs/' + req.body.folder_id + "/" + req.body.file_name
    })
}