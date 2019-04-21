import jwt from 'jsonwebtoken'

const checkAuth = (req,res,next)=>{
    try{
const verify = jwt.verify(req.header.authorization.split(" ")[1],"secret")
req.userData = verify
next()
}catch(e){
    return res.status(401).json({
        message:"Failed"
    })
}
}

export default checkAuth;