
const User = require('../models/userschema');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const uploadFile = require('./imageuploader');
passport.use(new LocalStrategy(User.authenticate()));

const sendMail = require('../utils/nodemailer');
const greetMail = require('../utils/greetingMail');

exports.registerpage = async function (req, res, next) {
  try {
    const { fullname, username, email, password } = req.body;
    const user = await User.register({
      fullname,
      username,
      email
    }, password);

    greetMail(res,user)

    // User.register(newUser, req.body.password, function(err, user){
    //   if(err){
    //     res.send(err);
    //   }
    //   passport.authenticate('local')(req, res, function(){
    //     res.redirect('/login');
    //   });
    // } )
  } catch (error) {
    console.log(error);
  }
}


exports.loginpage = passport.authenticate('local', {
  successRedirect: "/profile",
  failureRedirect: "/login",
}), function (req, res, next) { }


exports.logoutpage = (req, res, next) => {
  req.logOut(() => {
    res.redirect('/')
  })
}

exports.updatepage = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (req.files) {
      const result = await uploadFile(req, res)
      user.profileImage = result.url;
    }
    // user.image.fileId = result.fileId;
    await user.save();
    res.redirect('/profile')
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}


exports.resetPassword = async (req, res, next) => {
  try {

    const user = await User.findOne({ _id: req.user._id })
    await user.setPassword(req.body.password)
    await user.save()
    res.redirect('/login')
  } catch (error) {
    console.log(error);

  }
}

exports.forgotEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    const url = `${req.protocol}://${req.get("host")}/forgotpassword/${user._id}`;
    if (user) {
      // res.redirect(`/forgotPassword/${user._id}`)
      sendMail(res, user, url);
    } else {
      res.send('User not found');
    }
  } catch (error) {
    console.log(error);
  }
}


exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if(user.resetToken==1){
      await user.setPassword(req.body.password);
      user.resetToken= 0;
      await user.save();
    }else{
      res.send('Token expired');
    }
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
}