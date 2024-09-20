const mongoose = require("mongoose");
const { Schema } = mongoose;
const ExpenseSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_id",
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required:true
  },
  bank_account: {
    type: String,
    required:true,
  },
  note:{
    type:String,
    default:""
  }
});
module.exports = mongoose.model("expenses", ExpenseSchema);
