const mongoose = require('mongoose');
const {Schema}=mongoose;
const UserSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    language:{
        type:String,
        default:"English"
    },
    currency:{
        type:String,
        default:"INR"
    },
    subscription:{
        type:String,
        default:"Basic"
    }
  });

  module.exports=mongoose.model('user',UserSchema);