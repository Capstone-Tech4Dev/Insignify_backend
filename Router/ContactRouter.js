const express = require('express');
const router = express.Router();

const{
    contactInfo,
    getAllMessages,
    getMessageById,
    deleteMessage,
  } = require('../controller/ContactController');

  
router.post('/contactUs', contactInfo);
router.get('/message', getAllMessages);
router.get('/message/:id', getMessageById);
router.delete('/message/:id', deleteMessage);


module.exports = router;