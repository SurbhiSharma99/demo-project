
const mongoose = require("mongoose");
//Mongo db atlas  : cloud
mongoose.connect("mongodb+srv://surbhisharma1802:rVWGKOWhYtbIYt9w@cluster0.b3ntk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("MongoDb Connected"))
.catch((err) => console.log("Error in connecting to MongoDB",err))

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true

    },
    password :{
        type:String,
        required:true
    },
    userName :{
        type:String,
        required:true
    }
})

const User = mongoose.model("user",userSchema);

module.exports={
    User

}