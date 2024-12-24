const responseObj = require("../Util/Response")
const error = require("../Error/error.js")

const validateQueryParam = (requestParam,response,next) => {
    const queryParams = Object.keys(requestParam.query);
    const allowedParams = ['userName', 'password'];
    const invalidParams = queryParams.filter(param => !allowedParams.includes(param));    
    if (invalidParams.length > 0) {
        return response.status(400).json(responseObj.failureResponse(error.INVALID_PARAM.message,[error.INVALID_PARAM.code,error.INVALID_PARAM.errorMessage + invalidParams.join(', ')]));
    }
    
      next();
}

const validatePostReqBody = (requestBody,responseBody,next) => {
    const body = requestBody.body;
    if (!body) {
        return "Request Body is empty.";
    }
    const validations = [
        { field: "firstName", validator: isValidName},
        { field: "lastName", validator: isValidName},
        { field: "email", validator: isValidEmail},
        { field: "phoneNumber", validator: isValidPhoneNumber },
        { field: "password", validator: (val) => val && val.length >= 6},
        { field: "gender", validator: isValidGender} ,
        { field: "userName", validator: (userName) => userName != null && userName.trim() !== ""}
    ];
    const errors =[];
    for (let { field, validator } of validations) {
       if (!body[field] || !validator(body[field])) {  
            errors.push(field);          
         }              
    }
    if(errors.length !=0){
        return responseBody.status(400).json(responseObj.failureResponse(error.INVALID_VALUE.message,[error.INVALID_VALUE.code,error.INVALID_VALUE.errorMessage + errors.join(',')]))
    } 
    next();  
}

function isValidName(str) {
    return /^[A-Za-z]+$/.test(str);
  }

function isValidEmail(email) {
    const regex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

function isValidPhoneNumber(phoneNumber) {
    if(phoneNumber.length != 10){
        return false;
    }
    const regex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?)?\d{1,4}$/;
    return regex.test(phoneNumber);
  }

function isValidGender(gender) {
    const validGenders = ["Male", "Female", "Other"];
    return validGenders.includes(gender);
}

module.exports = {
    validateQueryParam,
    validatePostReqBody
}