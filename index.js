const express=require("express");
const mongoose=require("mongoose");
const authRouter = require("./routers/auth");

const PORT=process.env.PORT || 3000;
const app=express();


app.use(express.json());
app.use(authRouter);

const DB="mongodb+srv://Rohittt:RoPo99226123@cluster0.ouujbox.mongodb.net/?retryWrites=true&w=majority"

mongoose
   .connect(DB)
   .then(()=>{
    console.log("Connection was successful");
   })
   .catch((e)=>{
    console.log(e);
   })

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Connected at post ${PORT}`);

});