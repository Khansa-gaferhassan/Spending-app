

const express = require('express');

const User =require('../models/user');

//const {secret} = require('../config/dbconfig')

const jwt =require('jsonwebtoken');
const dbconfig = require('../config/dbconfig');
const {JWT_SECRET} = require('../config/dbconfig')
const UserController ={};

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

UserController.register = async (req, res,next)=>{
    const {name,email,password,joined} =req.body;

    const  newUser=new User({
        name,
        password,
        email,
        joined
    })
    try{
        const user =await newUser.save();
        return res.send({user});
    }catch(err){

    if (err.code === 11000 &&err.name ==='MongoError'){

        var error =new Error(`Email address ${newUser.email}is already token`);
        next(err);
    }  else{
        next(err);
    }  
    }
}


UserController.login = async(req,res,next) =>{
  const {email, password} = req.body;
  try{

    const user = await User.findOne({email});

    if(!user){
        const err = new Error(`The Email ${email} not found in our system`);
        err.status =401;
        next(err)
    }
    user.isPasswordMatch(password,user.password,(matched) =>{
       
        if(matched){

            
         
             //const secret = JWT_SECRET;
            // var token = jwt.sign({_id:user._id}, dbconfig.JWT_SECRET)
            var token = jwt.sign({_id:user._id}, JWT_SECRET)
          return res.send({token})

        };

    
         res.status(401).send({

        error:'Invalid email/password'
    });
    
      });
      }catch (err){
         next(err);
        }
}
module.exports =UserController;