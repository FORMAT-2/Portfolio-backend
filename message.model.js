const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        lowercase:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message = mongoose.model('Message',MessageSchema)

module.exports = Message;