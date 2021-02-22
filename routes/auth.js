const router=require("express").Router()
const User=require("../model/user.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const verify=require("./verifyToken")



router.post('/register',async (req,res)=>
{
    const emailExist=await User.findOne({email:req.body.email})
    if(emailExist) return res.send("email already exists")
    const hashedPassword= await bcrypt.hash(req.body.password,10)
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    try {
        const savedUser=await(user.save())
        res.send(savedUser);
        
    } catch (error) {
        res.send(error)
        
    }
})
router.post('/login',async (req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return res.send("email does not exist")
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send("Invalid Paasword")
    try
    {
        let jwtToken = jwt.sign({
            email: user.email,
            userId: user._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });

        res.header("auth-token",jwtToken).status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            user: {
                email: user.email
                
            }
        });
    }
    catch(err){
        res.send(err)
    }
})


router.get('/',verify,async (req,res)=>{
    const user=await User.find()
    res.json(user)

})
router.get('/:Id',verify,async (req,res)=>{
    const user=await User.find({_id:req.params.Id})
    res.json(user)
})
router.delete("/:id",verify,async (req,res) =>{
    const _id=req.params.id
    try {
        const deletedUser=await User.findByIdAndDelete(_id)
        res.status(204)
        
    } catch (error) {
        console.log(error.message)
    }
})
router.put("/:id",verify,async (req,res)=>{
    const _id=req.params.id
    try {
        const updatedUser=await User.findByIdAndUpdate({_id},{name:req.body.name})
        res.send(updatedUser)
    } catch (error) {
        console.log(error.message)
    }
})    


module.exports=router;