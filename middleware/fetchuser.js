const jwt=require("jsonwebtoken");
const JWT_SECRET="KetanMaini@server";

const fetchuser = (req,res,next)=>{
    // Get user from Jwt token and add id
    const token=req.header("auth-token");
    if(!token){
        res.status(401).json("Please authenticate a vaild token");
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).json("Please authenticate a vaild token");
    }
}

module.exports=fetchuser;