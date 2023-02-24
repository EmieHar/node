const express = require('express');
const router = new express.Router();
const Blog = require('../models/blog');

router.post('/blogs', (req, res) => {
    
    const blog = new Blog(req.body);
    blog.save().then((blog) => {
        res.status(201).send(blog);
    }).catch((error) => {
        res.status(400).send(error);
    })
    
})

router.get('/liste',(req,res)=> {
    Blog.find().then((blogs)=>{
        res.status(201).send(blogs);
    })
})


router.get('/blog/:id',(req,res)=> {
    let id = req.params.id 
    Blog.find({_id:id}).then((blogs)=>{
        res.status(201).send(blogs);
    })
})



module.exports = router;