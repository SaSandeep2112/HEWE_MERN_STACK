import mongoose from "mongoose"
import validator from "validator"


const appointmentSchema = new mongoose.Schema({
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
   appointment_date:{
    type: String,
    required : true,
   },
   department :{
    type : String,
    required : true
   },
   doctor :{
    firstName :{
        type:String,
        required : true,
    },
    lastName:{
        type : String,
        required : true,
    },
},
hasVisted :{
    type : Boolean,
    requird : true,
    default : false,
},
doctorId:{
    type: mongoose.Schema.ObjectId,
    requird: true,
},
patientId:{
    type: mongoose.Schema.ObjectId,
    requird: true,
},
address:{
    type:String,
    required:true,
},
status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
}
})
export const Appointment  = mongoose.model("Appointment",appointmentSchema);

