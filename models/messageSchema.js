import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message:{
        type : String,
        required : true,
        minLength:[10,"Message Must Contain At least 10 characters"],
      
    },
})

export const Message  = mongoose.model("message",messageSchema)