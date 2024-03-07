import passport from "passport";
import { Strategy } from "passport-local";
import { userDB } from "../mongoose/schema/user_DBschema.mjs";
import { comparePassword } from "../utils/encrypt.mjs";
import { responseHandler } from "../route/responseHandler.mjs";
import { request,response } from "express";


passport.serializeUser((user, done) => {
    console.log("in serializer")
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        console.log("In deserializer try:-");
        const findUser = await userDB.findOne({ email: email })
        console.log(email);
        if (!findUser)
            throw new Error('user email not found');
            // responseHandler('user email not found',true, {}, 400, response);//*#*##*#*#*#*statements not working- unable to pass response as argument
        done(null, findUser);
    }
    catch (error) {
        console.log("In deserializer catch:-");
        responseHandler(error,true, {}, 400, response);//*#*##*#*#*#*statements not working- unable to pass response as argument
        done(error, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    
        console.log("in strategy logic: ") 
        let findUser = await userDB.findOne({ email });   
       try {
        if (!findUser)
            throw new Error("Email not registered-");
            // responseHandler('Email not found__!',true,{},400,response);//*#*##*#*#*#*statements not working- unable to pass response as argument        
        if(!comparePassword(password, findUser.password))
            throw new Error("Invalid password-");
        done(null,findUser);
        }   
        catch (error) {
            console.log({'strategy Error':error});
            done(error,null);    
            // responseHandler(error,true,{},400,response);
        }
    })
);     




 
        /*
                try {
                    console.log("In strategy try");
                    const findUser = await userDB.findOne({ email });
                    if (!findUser)
                        // done(null,false,{msg :'Email not registered___!'})
                        // throw new Error("Email not registered");
                        // return responseHandler(true, 'Email not registered', 400,response);
                    if (!comparePassword(password, findUser.password))
                        // done(null,false,{msg: 'Invalid password___!'})
                        // return responseHandler(true, 'invalid password', 400, response);
                    done(null, findUser);
                }
                catch (error) {
                    console.log("In strategy catch:");
                    done(error, null);
                }
        */
        
          
            // try {
            //     if (!findUser){
            //         console.log("In !finduser try");
            //         responseHandler('')
            //     }
            //     try{
            //         if (!comparePassword(password, findUser.password)) {
            //             console.log("In !comparePassword try");
            //             responseHandler(true, 'error', 400, response);

            //             // throw new Error("invalid password-");
            //         }
            //     done(null, findUser);
            //     }
            //     catch (error) {
            //         console.log( error );
            //         findUser=false;
            //         done(null, findUser);
            //     }
            // }
            // catch (error) {
            //     console.log( error );
            //     findUser=false;
            //     done(null, findUser);
            // }

        // done(null,false,{msg :'Email not registered___!'})
        // throw new Error("Email not registered");
        // return responseHandler(true, 'Email not registered', 400,response);
   
            // done(null,false,{msg: 'Invalid password___!'})
            // return responseHandler(true, 'invalid password', 400, response);
