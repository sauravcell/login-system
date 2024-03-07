
/*
1. message : success or error message
2. error (boolean)
3. data : object with all keys if there is any data
4. statusCode: 400,200 etc
*/
// export const responseHandler=(msg,err,data,status)=>{

// import { response } from "express";

export const responseHandler = (msg, err_status, data, statusCode, response) => {
    console.log('in response handler:');
    let reply = {
        'message': msg,                             //*  succeess/err_msg
        'error': err_status,
        'statusCode': statusCode
    }

    if (!err_status)
        reply.data = data;

    console.log({'Response sent': reply});
    response.status(statusCode).send(reply);

}