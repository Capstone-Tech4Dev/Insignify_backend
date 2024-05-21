const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
},
{
    timestamps:true,
})

const contact = mongoose.model("contact", ContactSchema);

module.exports = contact