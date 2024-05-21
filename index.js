const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const questionRouter = require("./Router/questionRouter");
const userRouter = require("./Router/userRoute");
const contactRouter = require("./Router/ContactRouter")
const psychometricQuestions = require('./Questions.json');

const app = express();
app.use(express.json());

app.use(cors());

//database connection
const connect = require("./config/database");


app.use("/", questionRouter);
app.use("/", userRouter);
app.use("/", contactRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
