const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    currentYear:{
        type: String,
        default: ""
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:[
            "student",
            "mentor",
            "admin"
        ],
        default:"student"
    },

    bio:{
        type:String,
        default:""
    },

    course:{
        type: String,
        default: ""
    },

    branch:{
        type:String,
        default:""
    },

    year:{
        type:Number,
        default: 0
    },

    linkedin:{
        type:String,
        default:""
    },

    github:{
        type:String,
        default: ""
    },

    leetcode:{
        type:String,
        default: ""
    },

    project:{
        type:Array,
        default: []
    },

    codolioCollege:{
        type: Number,
        default: 0
    }

},{
    timestamps:true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;