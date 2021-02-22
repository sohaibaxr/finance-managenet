const router = require("express").Router();
const mongoose = require("mongoose");
const verify=require("./verifyToken")

const Expenses= require('../model/expenses.js')
const User = require("../model/user.js")


router.post("/",verify,async (req, res) => {

    const expense = new Expenses();
    expense.name = req.body.name;
    expense.price = req.body.price;
    expense.user = await User.findOne({_id:req.body.user})
    
    await expense.save();
    res.send(expense);
});
router.get("/",verify ,async (req, res) => {
    const expense = await Expenses.find({});
    res.send(expense);
});


router.delete("/:userid",verify,async (req,res) =>{
    const _id=req.params.id
    try {
        const deletedExpense=await Expense.findByIdAndDelete(_id)
        res.send(deletedExpense)
        
    } catch (error) {
        console.log(error.message)
    }
})
router.get("/:userId",verify,async (req,res)=>{
    const _id=req.params.userId
    const expense=await Expenses.find({user:_id})
    res.send(expense)
    
})
router.put("/:id",verify,async (req,res)=>{
    const _id=req.params.id
    try {
        const updatedUser=await Expenses.findByIdAndUpdate({_id},{name:req.body.name})
        res.send(updatedUser)
    } catch (error) {
        console.log(error.message)
    }
}) 
    
    





module.exports = router
