const mongoose = require("mongoose")

const ApplicantSchema = new mongoose.Schema({
    fullName:{
        type: String
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type:String, 
        
    },
    gender:{
        type: String
    }, 
    education:{
        type: String
    },
    ocupation:{
        type:String
    },
    career:{
      type: String
    },
    factor:{
        type: String
    }
    
},
// {
//     collection: "Applicants"
// },
{
    timestamps: true,
})

const Applicant = mongoose.model("Applicants", ApplicantSchema);

module.exports =Applicant