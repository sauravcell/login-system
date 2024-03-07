//validation for client input

const userValidation={
    firstName:{
        notEmpty:{
            errorMessage: "first name not found"
        },
        isString:{
            errorMessage: "first name not a string"
        },
    },
    lastName:{
        notEmpty:{
            errorMessage: "first name not found"
        },
        isString:{
            errorMessage: "first name not a string"
        },

    },
    email:{
        isEmail:{
            errorMessage: "Invalid email provided."
        },
        notEmpty:{
            errorMessage: "email not found"
        },

    },
    password:{
        isLength:{
            options:{
                min:6
            },
        },
        notEmpty:{
            errorMessage: "password is empty"
        },
    },
    confirmPassword:{
        isLength:{
            options:{
                min:6
            },
        },
        notEmpty:{
            errorMessage: "password not confirmed"
        },
    },
}

export {userValidation};