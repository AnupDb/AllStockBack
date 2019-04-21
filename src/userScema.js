import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    photo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"photo"
    }]
})

const User = mongoose.model('user',userSchema) 

export default User