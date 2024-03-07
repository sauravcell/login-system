// import { Router } from "express";
import { responseHandler } from "../route/responseHandler.mjs";
import jwt, { decode } from "jsonwebtoken";

// const router = Router();

const secretKey = 'blacknike';    //secret ket for jwt token

export const sign = (request, response) => {
    console.log('in jwt sign func_ ');
    const { firstName, lastName } = request.user;
    const payload = {
        fName: firstName,
        lName: lastName
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: 60 });       //secs
    console.log({ 'jwt token ': token });
    response.cookie('jwt_token', token);
    responseHandler('success', false, token, 200,response);
}

export const verify_func = (request, response) => {
    console.log("in jwt_verify function ");
    const jwtToken = request.headers.authorization;
    const token = jwtToken.split(' ');     //splitting to extract the token
    if(!token)
        responseHandler('no user logged in to verify__!',false,{},200,response)
    try {
        const verify = jwt.verify(token[1], secretKey);
        console.log(verify);
        responseHandler('success', false, verify, 200, response)        //not modified
    } catch (error) {
        console.log({ 'jwt verify err': error });
        responseHandler(error, true,{}, 400, response)                 //not modified
    }
}