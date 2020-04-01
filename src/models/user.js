const mongoose = require('mongoose')
const validator = require('validator')
const User = mongoose.model('User',{
    name: {
        type: String,
        required:true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.toLowerCase() === "password"){
                throw new Error("Password can;t be password")
            }
        }
    },
    email:{
        type: String,
        required:true,
        trim: true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not a valid email")
            }
        }
    },
    age :{
        type: Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Enter Age in Positive')
            }
        }
    }
})

module.exports = User;