const express =require("express");
const bcryptjs=require("bcryptjs");
const User = require("../model/user");
const authRouter=express.Router();

// Sign UP
authRouter.post("/api/signup",async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res
                .status(400)
                .json({msg:"User with same email already exists!!"});
        }

        const hashedPassword=await bcryptjs.hash(password,8);
        let user=new User({
            email,password:hashedPassword,name,
        })
        user=await user.save();
        res.json(user);


    }catch(e){
        res.status(500).json({error: e.message});

    }
});

// Sign IN

authRouter.post("/api/signin", async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:"User with the below email doesn't exist!!"});
        }

        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect password!!"});
        }


    }
})


module.exports=authRouter;