const mongoose = require('mongoose');

// Define the schema for the test response
const ResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
    question:{
        type: String,
        required: true
    },
  questionNumber: {
    type: Number,
    required: true
  },
  // response: {
  //   type: String,
  //   required: true
  // },
  responses: {
    type: Object,
    required: true
  },
  // You can add more fields as needed
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the mongoose model for the test response
const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;



