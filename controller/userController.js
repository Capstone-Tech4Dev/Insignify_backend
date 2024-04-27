const User = require("../Model/User");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const secretKey = process.env.JWT_SECRET_KEY;

async function signup(req, res){
    try{
       const {
        fullName,
        email,
        age,
        gender,
        occupation,
        education,
        career,
        factor,
        password
       } = req.body;

       //checking if email already exists
       const existingUser = await User.findOne({ email });

       if (existingUser){
        return res.status(405).json({
            message: 'Email already exists'
        });
       }

       const hashedPassword = await bcryptjs.hash(password, 10);

       await User.create({
        fullName,
        email,
        age,
        gender,
        occupation,
        education,
        career,
        factor,
        password: hashedPassword
       });

       res.status(201).json({
        message: 'User successfully registered'
       });

       console.log("User successfully registered");
    } catch(error){
    console.error('Error during sign-up', error);
     res.status(500).json({
        message: 'Server error'
     });
    
    }
}


//login route
async function login(req, res){
    try{
        const { email, password } = req.body;

        //find user by email
        const findUser = await User.findOne({email});

        if(!findUser){
            return res.status(404).json({
                message: 'User not found'
            });
    }
    //compare the provided password with the stored password
    const isPasswordValid = await bcryptjs.compare( password, findUser.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }

    //User is authenticated, generate a token or session
    const token = jwt.sign({ userId: findUser._id}, secretKey);
    res.cookie("token", token, {
      httpOnly: true,
      // Additional cookie options if needed
      // secure: true,
      // sameSite: "strict",
    });

    res.status(200).json({
        message: 'Login successful',
        userId: findUser._id,
        fullName: findUser.fullName,
        email: findUser.email,
        password: findUser.password,
        token:token
    })

    }catch(error){
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal Server error'
        })
    };
};

module.exports={
    signup,
    login
};