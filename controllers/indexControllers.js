

const postSchema = require('../models/postSchema');
const userSchema = require('../models/userschema');
exports.indexpage = async (req, res, next) => {
    const allPosts = await postSchema.find()
    res.render('index', { allPosts, user: req.user });
}
exports.allBlogs = async (req, res, next) => {
    const allPosts = await postSchema.find()
    res.render('allblogs', { allPosts, user: req.user });
}

exports.registeruserpage = (req, res) => {
    res.render('createuser', { user: req.user });

}

exports.loginpage = (req, res) => {
    res.render('login', { user: req.user });

}

exports.profilepage = async (req, res, next) => {
    try {
        const allPostsUser = await userSchema.findById(req.user._id).populate('posts')
        const allPosts = allPostsUser.posts;
        const user = await userSchema.findById(req.user)
        //   console.log(allPosts);
        res.render('profile', { user, allPosts });

    } catch (error) {
        console.log(error);
    }

}

exports.createpostpage = (req, res, next) => {
    res.render('createpost', { user: req.user });
}

exports.explorePage = async (req, res, next) => {
    const post = await postSchema.findById(req.params.id)
    res.render('exploreBlog', { post: post, user: req.user });
}

exports.updateprofilepage = (req, res, next) => {
    res.render('updateprofile', { user: req.user })
}

exports.deleteuserpage = async (req, res, next) => {
    await userSchema.findByIdAndDelete(req.params.id)
    // console.log("deleted");
    res.redirect('/login')

}

exports.resetPasswordpage = (req, res, next) => {
    res.render('resetPassword', { user: req.user });
}

exports.forgotEmailpage= (req,res,next)=>{
    res.render('forgotEmail');
}

exports.forgotPasswordpage= (req,res,next)=>{
    res.render('forgotPassword',{id:req.params.id});
}