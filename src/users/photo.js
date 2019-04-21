import express from 'express'
import Photo from '../photoSchema'
import User from '../userScema'

const photoRoutes = express.Router()

photoRoutes.route('/').post(async (req,res)=>{
var photoAdd = await Photo.create({imageURL:req.body.largeImageURL,
previewURL:req.body.previewURL})
await User.findByIdAndUpdate({_id:req.body.userId},{$push:{photo:photoAdd_id}})
})

export default photoRoutes