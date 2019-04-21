import mongoose from "mongoose"

photoSchema = mongoose.Schema({
    imageURL:{
        type:String,
        required:true,
        unique:true 
    },
    previewURL:{
        type: String,
        required: true,
        unique: true 
    }
})

const Photo = mongoose.model("photo",photoSchema)
export default Photo