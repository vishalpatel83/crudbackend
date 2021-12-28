require('dotenv').config();
const express = require('express');
const router=express.Router();
let Employeemodel=require("../models/Employee")
let User=require("../models/user");
const crypto=require('crypto')
const jwt=require('jsonwebtoken')

//ADD THE EMPLOYEE
router.route('/addEmployee').post(function (req, res) {
    debugger
    let employee = new Employeemodel(req.body);
    employee.save()
    .then(() => {
    res.status(200).json({ 'employee': 'Employee Added Successfully' });
    })
    .catch(err => {
    res.status(400).send("Something Went Wrong");
    });
    });
// GET ALL EMPLOYEE LIST
router.route('/').get((req,res)=>{
    Employeemodel.find().then(emp=>{
        res.json(emp)
    }).catch((err)=>{
        res.status(400).json('Error: ' +err)
    })
    
})

// GET EMPLOYEE BY ID
router.route('/getemployee/:id').get((req,res)=>{
    Employeemodel.findById(req.params.id).
    then(
       emp=>res.json(emp)
    ).catch(err=>{
        res.status(400).json('error'+err)
    })
})
// DELETE EMPLOYEE BY ID
router.route('/deleteemployee/:id').delete((req,res)=>{
    Employeemodel.findByIdAndDelete(req.params.id)
    .then(
        emp=>res.json(emp)
    ).
    catch(err=>res.status(200).json('err'+err))
})

// UPDATE EMPLOYEE BY ID
router.route('/updateemployee/:id').put((req,res) => {
    Employeemodel.findById(req.params.id)
    .then(employee => {
        employee.Name = req.body.Name||employee.Name;
        employee.EmpNo = req.body.EmpNo|| employee.EmpNo;
        employee.Salary = req.body.Salary||employee.Salary;
        employee.Role = req.body.Role||employee.Role;
        employee.save()
    .then(() => res.json('Employee updated !'))
    .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
    });

    router.route('/register').post(function (req, res) {
        debugger
        let user = new User(req.body);
        

      
     
         const token=  user.generateAuthToken();
         user.save()
        .then(() => {

        res.status(200).json({"user":"user added"});
    
        })
        .catch(err => {
        res.status(400).send("Something Went Wrong");
        });
        });


    router.get('/login',(req,res)=>{
        const username=req.body.username;
        const user={name:username};
        const accessToken=jwt.sign(user,"VISHALPATELISHERE");
        res.json({
            accessToken:accessToken
        })

    })

    module.exports=router;