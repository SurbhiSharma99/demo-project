const dbConection = require("../Config/schema.js");
const userData = dbConection;

const userName = async (username) => {
    const existingUser = await userData.User.findOne({ userName:username });
    return existingUser;
  }

 

  module.exports ={
    userName
  }