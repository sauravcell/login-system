import bcrypt from "bcrypt";
import { responseHandler } from "../route/responseHandler.mjs";
import { response } from "express";
const saltRounds=10;

export const hashPassword = (password)=>{
    console.log("In hash password brypt:")
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
}

export const comparePassword = (plain,hashed)=>{
    console.log("In compare password bcrypt");
    return bcrypt.compareSync(plain,hashed);
    // responseHandler("Invalid password",true,{},400,response)    
}
