const express = require('express');
const router = express.Router();
const uploadImage = require('../utils/uploadImage') ;
const blogController = require('./../controllers/blogController');
const passport = require('passport') ;

router.post('/listBlog', blogController.listBlog) ;

router.post('/*' , passport.authenticate('jwt', { session: false }));

router.post('/saveBlog', uploadImage , blogController.saveBlog);
router.post('/userBlogs', uploadImage , blogController.userBlogs);
router.post('/updateBlog', uploadImage , blogController.updateBlog);
router.post('/uploadImage', uploadImage, blogController.uploadImage) ;

module.exports = router;