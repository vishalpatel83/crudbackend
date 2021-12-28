require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const app = express();
const bodyParser=require('body-parser')
const connectdb=require('./db/connectdb')
// const port=5000;
const Employee=require("./routes/Employeeroute");
const cors = require('cors');
const port = process.env.PORT || '5000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";
app.use(bodyParser.json());
// database connection
// mongoose.createCollection("mongodb://localhost:27017/Employee", {
//   useNewUrlParser: "true",
// })
// mongoose.connection.on("error", err => {
//   console.log("err", err)
// })
// mongoose.connection.on("connected", (err, res) => {
//   console.log("mongoose is connected")
// })

// DATABASE ONNECTION
connectdb(DATABASE_URL);

//HERE IS PERMISSION FOR THE ACCESS DATA FROM DIFFERNT ORIGIN HERE IS ORIGIN REACT APP:LOCALHOST:3000
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/Employee', Employee);
app.use('/user',Employee);

//DATABASE CONNECTION
// mongoose.connect('mongodb://localhost:27017/Employee',{ 
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("database connected")
// }).catch((err)=>{
//     console.log(err)
// })
//SERVER CONNECTION
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
   })