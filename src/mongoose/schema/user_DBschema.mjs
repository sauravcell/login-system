//validation for DB input

import mongoose, {Mongoose} from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.Schema.Types.String,
        required: true,   
    },
    lastName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    confirmPassword:{
        type: mongoose.Schema.Types.String,
        required: true,
    },

});

export const userDB=mongoose.model("userDB",UserSchema);