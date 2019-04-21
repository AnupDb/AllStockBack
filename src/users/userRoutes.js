import express from "express"
import bcrypt from 'bcrypt'
import User from '../userScema'
import jwt from 'jsonwebtoken'
import Photo from '../photoSchema'

const userRoute = express.Router()

userRoute.route('/').post((req,res)=>{
User.find({email:req.body.email}).exec().then(user=>{
    if(user.length>=1){
        return res.status(409).json({
            message:'Mail exists'
        })
    }else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else{
                User.create(
                    {   
                        username:req.body.username,
                        email:req.body.email,
                        password:hash
                    }
                ).then(user=>{
                    console.log(user)
                    res.status(201).json({message:"user created",
                username:req.body.username
                })
                })
            }
        }) 
    }
})
}).put( async (req,res)=>{
   const user = await User.find({email:req.body.email}).populate('photo').lean().exec()
    if(user.length<1){
        return res.status(401).json({
            message:"Auth failed"
        })
    }else{
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token =jwt.sign({
                    //add things you want to provide to user
                    email:user[0].email,
                    userId:user[0]._id,
                    photo:user[0].photo || []
                },"secret",{expiresIn:"10h"})
                return res.status(200).json({
                    message:"Auth successful",
                    token:token
                })
            }
            res.status(401).json({
                message:"Auth failed"
            })
        })
    }
})


export default userRoute