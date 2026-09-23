const mongoose = require('mongoose');

const newMentorSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    contact:{
        type:Number,
        required:true
    },

    year:{
        type:String,
        required:true
    },

    course:{
        type:String,
        required:true
    },

    branch:{
        type:String,
        required:true
    },

    cgpa:{
        type:String,
        required:true
    },

    github:{
        type:String,
        required:true
    },

    linkedIn:{
        type:String,
        required:true
    },

    graduation:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:[
            "applied",
            "declined",
            "approved"
        ],
        default:"applied"
    }

});

const newMentorModel = mongoose.model("newMentor", newMentorSchema);

module.exports = newMentorModel;