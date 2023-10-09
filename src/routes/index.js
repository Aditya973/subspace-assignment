const express = require('express');
const _ = require('lodash');

const router = express.Router();

router.get('/blog-stats',async (req,res)=>{
    try {
        const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs',{
            headers: {
                "Content-Type" : "application/json",
                "x-hasura-admin-secret" : "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6"
            }
        });
        const data = await response.json();
        const blogs = data.blogs;
        const numberOfBlogs = _.size(blogs);
        const sortedTitle = _.orderBy(blogs, [({ title }) => title.length, 'title'], ['desc']);
        const longestTitle = _.take(sortedTitle,1);
        const uniqueTitles = _.uniqBy(blogs,'title');
        const privacyBlogs = _.filter(blogs,(blog)=>{
            return _.includes(blog.title.toLowerCase(),'privacy')
        })
        return res.status(200).json({
            total: numberOfBlogs,
            longestTitle: longestTitle,
            blogsWithPrivacy: privacyBlogs,
            uniqueBlogs: uniqueTitles
        })        
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            err: error
        })
    }
})

router.get('/blog-search',async (req,res)=>{
    try {
        const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs',{
            headers: {
                "Content-Type" : "application/json",
                "x-hasura-admin-secret" : "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6"
            }
        });
        const data = await response.json();
        const blogs = data.blogs;
        const word = req.query.query;
        const privacyBlogs = _.filter(blogs,(blog)=>{
            return _.includes(blog.title.toLowerCase(),word.toLowerCase());
        })
        return res.status(200).json({
            data: privacyBlogs,
        })        
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            err: error
        })
    }
})

module.exports = router;