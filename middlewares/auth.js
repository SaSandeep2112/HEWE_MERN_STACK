
import { User } from "../models/userSchema.js";
import { catchAyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated = catchAyncErrors(async(req,res,next) => {
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated!",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SCERET_KEY)
    req.user = await User.findById(decoded.id);
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler (`${req.user.role} not authorized for resource!`,403))
    }
    next();
});
export const isPatientAuthenticated = catchAyncErrors(async(req,res,next) => {
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated!",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SCERET_KEY)
    req.user = await User.findById(decoded.id);
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler (`${req.user.role} not authorized for resource!`,403))
    }
    next();
});