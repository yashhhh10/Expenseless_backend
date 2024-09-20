const mongoose = require('mongoose');
const {Schema}=mongoose;
const AccountSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_id'
    },
    name:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    cardnum:{
        type:Number,
        default:""
    },
    color:{
        type:String,
        default:"#01aab8"
    }
  });
  module.exports=mongoose.model('accounts',AccountSchema);