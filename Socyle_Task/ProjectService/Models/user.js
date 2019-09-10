const mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    user_ID:{
        type:Number
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    telephone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    usertype:{
        type:String,
        require:true
    },
    approval:{
        type:Boolean,
        default:false
    },
    favoraitelist:{
        type:Array
    }
});

UserSchema.plugin(AutoIncrement,{inc_field : 'user_ID'});
module.exports = mongoose.model('user',UserSchema,'Users');