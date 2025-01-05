import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; // ES6 Modules




const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minLength :[3,"first Name Must Contain At least three characters"]
    },
    lastName:{
        type : String,
        required : true,
        minLength :[3,"first Name Must Contain At least three characters"]
    },
    email:{
        type : String,
        required : true,
        validate:[validator.isEmail,"Please Provider A Valid Email"]
    },
    phone:{
        type : String,
        required : true,
        minLength:[11,"Phone Number Must Contain Exat 11 digits"],
        maxLength:[11,"Phone Number Must Contain Exat 11 digits"],
    },
    nic:{
        type : String,
        required : true,
        minLength:[5,"NIC Must Contain Exact 5 digits"],
        maxLength:[5,"NIC Number Must Contain Exact 5 digits"],
      
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"],
    },
    gender:{
     type:String,
     required:true,
     enum:["Male","Female","Other"],
    },
    password:{
       type:String,
       minLength:[8,"password Must Contain Atleast 8 characters"],
       required:true,
       select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id: String,
        url: String,
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password =await bcrypt.hash(this.password,10);
    next();

})

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

userSchema.methods.generateJsonWebToken  = function(){
    return jwt.sign({id:this._id},process.env.JWT_SCERET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}
export const User  = mongoose.model("User",userSchema)