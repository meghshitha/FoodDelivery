const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: {
    type:String,
    required:true
  },
  items:{
    type:Array,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    default:"food Processing"
  },
  address:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now()
  },
  payment:{
    type:String,
    default:false
  }
  }

)

const orderModel= mongoose.model.Order || mongoose.model('Order',orderSchema);
module.exports=orderModel;