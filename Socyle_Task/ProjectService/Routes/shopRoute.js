const express = require('express');
const shopRouter = express.Router();
const mongoose = require('mongoose');
require("../Models/shop");

let ShopSchema = mongoose.model("shop");

shopRouter.post("/add",(request,response)=>{
    let shopdata = request.body
    let shop = new ShopSchema(shopdata);
    shop.save((error,result)=>{
        if (!shop.shopname||!shop.shoptype||!shop.shopdescripsion||!shop.shopadmin) {
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

shopRouter.get("/edit/:id",(request,response)=>{
    ShopSchema.findOne({shop_ID:request.params.id},(error,result)=>{
        response.send(result);

    });
})
shopRouter.put("/edit/:id",(request,response)=>{

    var shop = request.body;
    var updshop = {}

    if(shop.shopname&&shop.shoptype&&shop.shopdescripsion&&shop.shopadmin){
        updshop.shopname = shop.shopname;
        updshop.shoptype = shop.shoptype;
        updshop.shopdescripsion = shop.shopdescripsion;
        updshop.shopadmin = shop.shopadmin;
    }

    if (!updshop) {
        response.status(400);
        response.json({
            error :"Bad Data"
        })
    }else{
        ShopSchema.update({shop_ID:request.params.id},updshop,{},(error,result)=>{
            if(error)
            {
                response.send(error);
            }else{
                response.json(result);
            }
        })   
    }
})

shopRouter.delete("/delete/:id",(request,response)=>{
    ShopSchema.remove({shop_ID:request.params.id},(error,result)=>{
        if(error)
            {
                response.send(error);
            }else{
                response.json(result);
            }
    })
});

shopRouter.get("/list",(request,response)=>{
    ShopSchema.find({},(error,result)=>{
        if(!error)
        response.json(result);

    });
})

shopRouter.get("/shopdata/:adminname",(request,response)=>{
    ShopSchema.find({shopadmin:request.param.adminname},(error,result)=>{
        if(!error)
        response.send(result);
        else{
            response.send(error);
        }
    });
})

module.exports=shopRouter;