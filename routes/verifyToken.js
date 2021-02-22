const jwt = require("jsonwebtoken")
module.exports=function  (req,res,next){
    const token=req.header("Authorization")
    if(!token) return res.status(401).send("UnAuthorized")
    try {
        const verified=jwt.verify(token,"longer-secret-is-better")
        req.user=verified
        next();
    } catch (error) {
        res.status(400).send("Invalid Token")
        
    }
}