const jwt=require("jsonwebtoken")
module.exports=function (req,res,next){
    const token=req.header("auth_token")
    if(!token) return res.status(401).send("Ac")
}