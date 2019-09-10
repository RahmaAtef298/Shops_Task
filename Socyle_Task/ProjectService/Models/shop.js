const mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

const ShopSchema = new mongoose.Schema({
    shop_ID:{
        type:Number
    },
    shopname:{
        type:String,
        require:true
    },
    shoptype:{
        type:String,
        require:true
    },
    shopdescripsion:{
        type:String,
        require:true
    },
    shopadmin:{
        type:String,
        require:true
    }
});

ShopSchema.plugin(AutoIncrement,{inc_field : 'shop_ID'});
module.exports = mongoose.model('shop',ShopSchema,'Shops');