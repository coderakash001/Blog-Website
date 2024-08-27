const mongoose = require('mongoose');

exports.mondodb=()=>{
    try {
        mongoose.connect("mongodb://0.0.0.0/Blogwebsitee");
    console.log("connected to database");
    } catch (error) {
        console.log(error.message);
    }

}