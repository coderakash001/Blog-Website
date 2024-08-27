
const Post = require('../models/postSchema');
exports.createPost = async (req, res, next) => {
    try {
        const { title, image, description } = req.body;
        const newPost = new Post({ title, image, description, user: req.user._id });
        await newPost.save();
        await req.user.posts.push(newPost._id);
        await req.user.save();
        res.redirect('/profile')
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteBlog = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/profile')
    } catch (error) {
        console.log(error);
    }
}

exports.likepage = async (req, res, next) => {
    try {
        const id = req.params.pid
        const post = await Post.findOne({ _id: id });
        if (post.likes.includes(req.user._id)) {
            await post.likes.splice(post.likes.indexOf(req.user._id), 1);
        } else {
            await post.likes.push(req.user._id);
        }
        await post.save();
        res.redirect(`/exploreBlog/${id}`)
    } catch (error) {
        console.log(error);
    }



}