const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({

    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"questions",
        required:true
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    content:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

const replyModel = mongoose.model("reply", replySchema);

module.exports = replyModel;