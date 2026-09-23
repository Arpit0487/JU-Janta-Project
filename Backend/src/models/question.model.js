const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    status:{
        type:String,
        enum:[
            "pending",
            "answered",
            "closed"
        ],
        default:"pending"
    }

},{
   timestamps:true
});

const questionModel = mongoose.model("questions", questionSchema);

module.exports = questionModel;