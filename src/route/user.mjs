import { Router } from "express";
import { pathmiddleWare } from "../utils/middleware.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { userValidation } from "../utils/user_validationSchema.mjs";
import { hashPassword } from "../utils/encrypt.mjs";
import { userDB } from "../mongoose/schema/user_DBschema.mjs";
import { responseHandler } from "./responseHandler.mjs";
import { sign, verify_func } from "../utils/jwt_token.mjs";
import  passport from "passport";
import "../strategies/local_stategy.mjs";


const route=Router();
route.use(pathmiddleWare);
// console.log('route-initialize');
route.use(passport.initialize());
// console.log('route-session');
route.use(passport.session());


route.get('/', (request, response) => {
    const msg='Welcome to USER details DB.';
    responseHandler('success',false,msg,200,response);
});


route.post('/user/login', passport.authenticate("local"), (request, response) => {        //user login
    console.log("In main login route:");
    console.log({'login-session': request.sessionID});
    sign(request, response);

});



route.get('/user/verify/', (request, response) => {           //user token verify
    console.log("in verify route:");
    console.log({'verify-session-': request.sessionID})
    verify_func(request, response);

});




route.post('/user/logout/', (request, response) => {          //user logout
    console.log(`Inside logout route:`);
    console.log({'logout-session': request.sessionID});
    if (!request.user)
        return responseHandler('user not logged in', true, {}, 400, response);
    request.logout((err) => {
        if (err) {
            console.log({ 'Logout error:': err });
            return responseHandler(err, true, {}, 400, response);
        }
        return responseHandler('User logged out successfully', false, {}, 200, response);
    })
});

route.post('/user/data', checkSchema(userValidation), async (request, response) => {       //user input
    console.log('inside data-input route:');
    const result = validationResult(request);
    if (!result.isEmpty())
        return responseHandler(result.array(), true, {}, 400, response);
    const data = matchedData(request);
    data.password = hashPassword(data.password);
    data.confirmPassword = hashPassword(data.confirmPassword);
    const newUser = new userDB(data);
    console.log({ "NEW USER": newUser });
    try{
        const savedUser = await newUser.save();
        return responseHandler('details inserted successfully', false, {}, 201, response);
    }
    catch (error) {
        console.log(typeof(error));
        console.log(typeof(error.code))
        if(error.code===11000)
            return responseHandler( 'Email alredy registered', true, {}, 400, response);
        else return responseHandler('server error',true,'',500,response);    
    }
});


export default route;