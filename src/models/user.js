const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Task = require('../models/task')
const jwt = require('jsonwebtoken')

var userSchema = mongoose.Schema({
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
                throw new Error("Password can't be password")
            }
        }
    },
    email:{
        type: String,
        required:true,
        unique: true,
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
    },
    avatar : {
        type: Buffer
    },
    tokens :[{
        token:{
            type: String,
            required : true
        } 
    }]
},{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.password
    delete userData.tokens
    return userData
}

userSchema.methods.gernerateUserToken = async function(){
    const token = await jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token;
}


userSchema.statics.finduserbyCredential = async (email , password)=>{
    console.log("finduserbyCredential")
    const user = await User.findOne({email})
    if(!user){
        throw new Error("invalid email")
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("invalid password")
    }
    return user;
}

//Delete the task when user delete his own profile
userSchema.pre('remove',async function (next){

    await Task.deleteMany({owner: this._id})
    next()
})



//Hash the password before saving into database
userSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }


  next()  
})


const User = mongoose.model('User',userSchema)

module.exports = User;