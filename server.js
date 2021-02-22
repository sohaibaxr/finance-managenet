const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const app=express();

const authRoute=require("./routes/auth")
const productRoute=require("./routes/expense.js");



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/user',authRoute)
app.use('api/expense',productRoute)





mongoose.connect("mongodb://127.0.0.1:27017/my3",
{useNewUrlParser:true},()=>console.log("connected to Db"));
app.listen(5000,()=>console.log("server running on port 5000"))