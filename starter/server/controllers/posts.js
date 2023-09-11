const {Post} = require('../models/post');
const {User} = require('../models/user');


module.exports = {
    addPost: async (req, res) => {
        console.log('addPost')

        try{
            const {title, content, status, userId} = req.body 
            await Post.create({
                title: title,
                content: content,
                privateStatus: status,
                userId: userId
            })
            res.sendStatus(200)
        } catch(err) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(err)
            res.sendStatus(400)
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getCurrentUserPosts: async (req, res) => {
        try {
            console.log('getCurrentUserPosts')
            const {userId} = req.params
            const post = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    requires: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(post)
        } catch(err) {
            console.log('Error In getCurrentUserPosts');
            console.error(err);
            res.sendStatus(400)
        }
    },
    editPost: async (req, res) => {
        try {
            console.log('editPost')
            const {id} = req.params;
            const {status} = req.body;
            await Post.update({
                privateStatus: status
            },
            {
                where: {id: +id}
            })
            res.sendStatus(200)
        }catch(err) {
            console.log('Error In editPost')
            console.error(err);
            res.sendStatus(400);
        }
    },
    deletePost: async (req, res) => {
        try {
            console.log('deletePost')
            const {id} = req.params;
            await Post.destroy({where: {id: +id}})
            res.sendStatus(200)
        }catch(err) {
            console.log('Error in deletePost');
            console.error(err)
            res.sendStatus(400);
        }
    },
}