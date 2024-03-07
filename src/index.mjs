import express, { request, response } from "express";
import { pathmiddleWare } from "./utils/middleware.mjs";
import routes from "./route/route_index.mjs";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { upload } from "./utils/upload_diskStorage.mjs";

// import passport from "passport";
// import "./strategies/local_stategy.mjs"


// console.log('in app-index:');

const PORT = process.env.PORT || 5000;
const app = express();

mongoose
    .connect('mongodb://localhost/user_details')
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log(`Error in DB connection: ${err}`))

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});    

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "blacknike",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000   //1 mins
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    }),
}));
// console.log('app-initialize');
// app.use(passport.initialize());
// console.log('app-session');
// app.use(passport.session());
app.use(pathmiddleWare);
app.use(routes);




//File upload logic___!
app.post('/api/upload',upload.single('file'),(request,response)=>{
    // response.send('uploading successfull__!');
    console.log(request.file);
    response.json(request.file);
});


app.post('/user/', (request, response) => {      //rough work
    const { body } = request;
    response.status(201).send(["abc", body]);
    console.log({ "abcde": body })
})