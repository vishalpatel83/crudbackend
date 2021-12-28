const mongoose=require("mongoose");
const crypto=require("crypto");
const uuidv1=require('uuid/v1');
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    salt:String,
    encry_password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
},{
    timestamps:true
})
userSchema.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password)
})
.get(
    function(){
        return this._password;
    }
)

userSchema.methods={
generateAuthToken:async function(){
    try{ 
      const Token=jwt.sign({_id:this._id},"mynameisvishalpateldeveloper");
      this.tokens=this.tokens.concat({token:Token})
      console.log(Token)
      return Token;
    }
    catch(err){
         console.log(err)
    }
},
securePassword: function(plainpassword){
    return crypto
    .createHmac("sha256","vishalpatel").
    update(plainpassword).
    digest("hex");
    
}
 
}

module.exports=mongoose.model("User",userSchema);