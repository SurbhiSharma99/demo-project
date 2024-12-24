const dbConection = require("../Config/schema.js");
const bcrypt = require('bcryptjs');
const loginUserName = require("../Util/userName.js");
const userDetailsRespose = require("../DTO/userDetailsResponseData.js");
const response = require("../Util/Response.js")
const error = require("../Error/error.js")
const userData = dbConection;

async function userRegister (req,res) {
    const body = req.body;
    const userName  = await loginUserName.userName(body.userName); 
    if(userName){
        return res.status(400).json(response.failureResponse(error.USERNAME_ERROR.message,[error.USERNAME_ERROR.code,error.USERNAME_ERROR.errorMessage]));
      }  
    try {
    const existingUser = await userData.User.findOne({$or: [{ email: body.email },{ phoneNumber: Number(body.phoneNumber) }]});
    if(existingUser){
        return res.status(400).json(response.failureResponse( error.EMAIL_PHONENO_ERROR.message, [error.EMAIL_PHONENO_ERROR.code,error.EMAIL_PHONENO_ERROR.errorMessage]));
     }
    const passwordHash = await bcrypt.hash(body.password, 10);
    // it will create user and return the object
    const result = await userData.User.create({firstName:body.firstName,lastName : body.lastName, email:body.email,gender:body.gender,phoneNumber:body.phoneNumber,password:passwordHash, userName:body.userName});
     } catch (error){
        return res.status(500).json(response.failureResponse(error.DATABASE_ERROR.message,[error.DATABASE_ERROR.code,error.DATABASE_ERROR.errorMessage]));
     }    
    return res.status(201).json(response.successResponse("User Registered successfully!!",new userDetailsRespose(body)));
}


async function userLogin (req,res){
    try {
        const existingUser = await userData.User.findOne({userName :req.query.userName });
        if(existingUser != null){
            const isMatch = await bcrypt.compare(req.query.password, existingUser.password);
            if(!isMatch){
                return res.status(400).json(response.failureResponse(error.INVALID_VALUE.message,[error.INVALID_VALUE.code,error.INVALID_VALUE.errorMessage + 'password']));
            }
            return res.status(200).json(response.successResponse("User Details Found!!",new userDetailsRespose(existingUser)));
        }
    } catch (error){
        return res.status(500).json(response.failureResponse(error.DATABASE_ERROR.message,[error.DATABASE_ERROR.code,error.DATABASE_ERROR.errorMessage]));
    }      
    return res.status(404).json(response.failureResponse(error.NOT_FOUND.message,[error.NOT_FOUND.code,error.NOT_FOUND.errorMessage]));
    
}

module.exports = {
    userRegister,
    userLogin
    
}