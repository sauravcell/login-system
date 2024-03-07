export const pathmiddleWare = (request, response, next) => {      //Defining global middleware function
    console.log(`${request.method} : ${request.url}`);
    next();
};
