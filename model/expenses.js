const mongoose=require("mongoose")
const Schema=mongoose.Schema

const expenseSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    user:{
         type: Schema.Types.ObjectId,
         ref:"User"
    }
})
module.exports=mongoose.model("Expenses",expenseSchema)