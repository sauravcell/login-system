import passport from "passport";
import { Strategy } from "passport-local";
import { userDB } from "../mongoose/schema/user_DBschema.mjs";
import { comparePassword } from "../utils/encrypt.mjs";


passport.serializeUser((user, done) => {
    console.log("in serializer")
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        console.log("In deserializer try:-");
        const findUser = await userDB.findOne({ email: email })
        console.log(email);
        done(null, findUser);
    }
    catch (error) {
        console.log("In deserializer catch:-");
        console.log(error);
        done('Email not found', null);
    }
});

export default passport.use(
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    
        console.log("in strategy logic: ") 
       try {
        const findUser = await userDB.findOne({ email: email });          
            if (comparePassword(password, findUser.password)) 
                done(null,findUser);          
            else  {
                console.log('error:invalid password');
                done('Incorrect password',null);
            }   
        }   
        catch (error) {
            console.log({error});
            done('Email not registered',null);   
        }
    })
);     
    