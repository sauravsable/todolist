const mongoose=require("mongoose");

const todoschema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    }
})

const productmodel=new mongoose.model('todos',todoschema);

module.exports=productmodel;