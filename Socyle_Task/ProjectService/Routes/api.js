const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
require("../Models/user");

let UserSchema = mongoose.model("user");

function verifyToken(request,response,next){
  if(!request.headers.autherization){
    return request.status(401).send('Unautherized Token');
  }
  let token = request.headers.autherization.split(' ')[1];
  if(token === null){
   return request.status(401).send('Unautherized Token');
  }
  let payload = jwt.verify(token,'secretKey');
  if(!payload){
   return request.status(401).send('Unautherized Token');
  }
  request.userId=payload.subject;
  next()
}

router.get('/',(request,response) => {
   response.send('From api Router')
});

router.post('/signup',(request,response) => {
    let UserData = request.body
    let user =new UserSchema(UserData);

   user.save((error,registerUser)=>{
        if(error){
            console.log(error);
        }else{
            let payload = { subject : registerUser._id};
            let token = jwt.sign(payload , 'secretkey');
            response.status(200).send({token});
        }
    })
})

router.post('/login',(request,response) => {
   let UserData = request.body;

   UserSchema.findOne({email:UserData.email},(error,user)=>{
       if(error){
           console.log(error);
       }  else{
           if(!user){
               response.status(401).send('Invalid Email')
           }else
               if(user.password !== UserData.password){
                   response.status(401).send('Invalid Password')
               }else
               if(user.username !== UserData.username){
                response.status(401).send('Invalid Username')
            }else
               {
                           let payload = { subject : user._id};
                           let token = jwt.sign(payload , 'secretkey');
                           response.status(200).send({token});
                       }
       }
   })
})

router.get("/user/:username",(request,response)=>{
    UserSchema.find({username:request.param.username},{usertype:1},(error,result)=>{
        if(!error)
        response.send(result);
        else{
            response.send(error);
        }
    });
})

router.get("/shopadmins",(request,response)=>{
    UserSchema.find({usertype:"shopadmin"},(error,result)=>{
        if(!error)
        response.send(result);
        else{
            response.send(error);
        }
    });
})

router.post("/add",(request,response)=>{
    let shopadmindata = request.body
    let shopadmin = new ShopSchema(shopadmindata);
    shopadmin.save((error,result)=>{
        if (!shopadmin.username||!shopadmin.email||!shopadmin.telephone||!shopadmin.password||!shopadmin.usertype||!shopadmin.approval) {
            response.status(400);
            response.json({
                error :"Bad Data"
            })
        }else{
            if(!error)
            {
                response.send(result);
            }
            else
            response.send(error);
        }
    });
})

router.put("/edit/:id",(request,response)=>{

    var shopadmin = request.body;
    var updadmin = {}

    if(shopadmin.username&&shopadmin.email&&shopadmin.telephone&&shopadmin.password&&shopadmin.usertype&&shopadmin.approval){
        updadmin.username = shopadmin.username;
        updadmin.email = shopadmin.email;
        updadmin.telephone = shopadmin.telephone;
        updadmin.password = shopadmin.password;
        updadmin.usertype = shopadmin.usertype;
        updadmin.approval = shopadmin.approval;
    }

    if (!updadmin) {
        response.status(400);
        response.json({
            error :"Bad Data"
        })
    }else{
        UserSchema.update({user_ID:request.params.id},updadmin,{},(error,result)=>{
            if(error)
            {
                response.send(error);
            }else{
                response.json(result);
            }
        })   
    }
})


router.delete("/delete/:id",(request,response)=>{
    UserSchema.remove({user_ID:request.params.id},(error,result)=>{
        if(error)
            {
                response.send(error);
            }else{
                response.json(result);
            }
    })
});
 

module.exports=router;