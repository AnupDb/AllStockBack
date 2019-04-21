import express from 'express'
import {json,urlencoded} from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import checkAuth from './middleware/check-auth'

import userRoutes from './users/userRoutes'
import photoRoutes from './users/photo'

import  Mongoose  from 'mongoose';

const app = express()


//cors enable allows cross domain resource sharing
app.use(cors())
//convert given data to jsson like req.body
app.use(json()),
//attatch parameters to url
app.use(urlencoded({extended:true}))
//morgan does logging for us
app.use(morgan('dev'))




const start =()=>{
    app.listen(3000,()=>{
        console.log("server on port 3000")
    })
}
const connect =() =>{
    return Mongoose.connect('mongodb://localhost:27017/AllStockTest')
}
connect().then(async connection=>{
    start()
}).catch(e=>{
    console.error(e)
})
app.use('/photo',photoRoutes)
app.use('/user', userRoutes)

app.get('/',(req,res)=>{
    res.json({message:"Working"})
})