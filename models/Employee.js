const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const EmployeeSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    EmpNo:{
        type:Number,
        required:true
    },
    Salary:{
        type:Number,
        required:true
    },
    Role:{
        type:String,
        required:true
    }

},{timestamps:true})




module.exports=mongoose.model("Employees",EmployeeSchema);