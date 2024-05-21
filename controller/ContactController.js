const Contact = require("../Model/ContactModel");


async function contactInfo(req, res){
    try{
        const {name, email, subject, message} = req.body;

        await Contact.create({
            name,
            email,
            subject,
            message
        })

        res.status(201).json({
            message: 'Message successfully sent'
        })
    }
    catch(e){
   console.log("Error sending message",e);
   res.status(500).json({
    message: "Server error"
   })
     }
}

//get all messages
async function getAllMessages(req, res){
    try{
        const messages = await Contact.find();
        res.json(messages);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

//get each message submitted
async function getMessageById(req, res){
    try{
     const message = await Contact.findById(req.params.id);
     if(!message){
        return res.status(404).json({
            message: 'Message not found'
        });
     }
     res.status(200).json(message);
    }catch(e){
   res.status(500).json({
    message: error.message
   })
 }
}

//delete message
async function deleteMessage(req, res){
    try{
    const {id} = req.params;
    const message = await message.findByIdAndDelete(id);
    
    if(!message){
        return res.status(404).json({
            message: 'Message not found'
        });
    }
    res.status(200).json({
        message: 'message successfully deleted'
    })
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    contactInfo,
    getAllMessages,
    getMessageById,
    deleteMessage,
};