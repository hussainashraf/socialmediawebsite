const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Jwt_secret} = require('../key');
const requireLogin = require("../middleware/requireLogin");
router.get('/',(req,res)=>{
    res.send("Connected")
})
router.get('/createPost',requireLogin,(req,res)=>{
   console.log("hello auth")
})
router.post('/signup',(req,res)=>{
    const{name,userName,email,password} = req.body;
    if(!name||!userName||!email||!password){
        return res.status(422).json("Please enter all the fields")
    }USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Email or Username is already in used"})
        }bcrypt.hash(password,10).then((hash)=>{
            const user = new USER({
                name,
                email,
                userName,
                password:hash
            })
        user.save()
        .then(user=>{res.json({message:"Account Created Successfully"})})
        .catch(err=>{console.log(err)});
        })
    })

    })
   
router.post("/signin",(req,res)=>{
    const{email,password} = req.body;
    if(!email||!password){
        return res.status(422).json({error:"Please enter email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
        bcrypt.compare(password,savedUser.password).then((match)=>{
            if(match){
                // return res.status(200).json({message:"Signed in successfully"})
                const token = jwt.sign({_id:savedUser.id},Jwt_secret)
                res.json(token)
                console.log(token)
            }else{
                return res.status(422).json({error:"Invalid Password"})
            }
        }).catch(err=>console.log(err));
    })
})


module.exports = router;
