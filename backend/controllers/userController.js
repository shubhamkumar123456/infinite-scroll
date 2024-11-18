let UserCollection = require('../models/UsersCollection')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
let JWT_SECRET = "HellBoy768"

const registerUser = async(req,res)=>{
    const {name,email,password,address} = req.body;
    if(!name){
        return res.json({msg:"name is required",success:false})
    }

    if(!email){
        return res.json({msg:"email is required",success:false})
    }
    if(!password){
        return res.json({msg:"password is required",success:false})
    }

    let existingUser = await UserCollection.findOne({email})
    // console.log(existingUser)
    if(existingUser){
        return res.json({msg:"user already registered",success:false})
    }
    else{
        try {

            let hashedpassword = bcrypt.hashSync(password, salt) //changing password into hashed form or encypted form
            // console.log(password)
            // console.log(hashedpassword)
            let data = await UserCollection.create({
                name,
                email,
                password:hashedpassword,
                address
            })
        
            res.json({msg:"user registered successfully",success:true,data})
           } catch (error) {
            res.json({msg:'error in creating user',success:false,error:error.message})
           }
    }
}
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

   try {
    let existingUser = await UserCollection.findOne({email});


    if(existingUser){
        let comparePassword = bcrypt.compareSync( password,existingUser.password );
        if(comparePassword){
            let token = jwt.sign({ _id:existingUser._id,email:existingUser.email}, JWT_SECRET);
            res.json({msg:"user logged in successfully",success:true,token})
        }
        else{
            res.json({msg:"wrong password",success:false})
        }
    }
    else{
        return res.json({msg:"user not found ",success:false})
    }
   } catch (error) {
        res.json({msg:"error in log in user",success:false ,error:error.message})
   }


    // res.send('login function is running good')
}
const updateUser = async(req,res)=>{

   const {name,password,profilePic,coverPic} = req.body;
   const userId = req.params._id

   if(password){
    var hashedPassword = bcrypt.hashSync(password,salt)
   }

   console.log(hashedPassword)

   let data = await UserCollection.findByIdAndUpdate(userId, {$set:{name,profilePic,coverPic,password:hashedPassword}} ,{new:true})

   res.json({msg:"user updated successfully",success:true,user:data})

}
const deleteUser = async(req,res)=>{
   


    try {
        let paramId = req.params._id;

    let userId = req.user._id // this is get from token

    console.log("logged in userId = ", userId)
    console.log("user id you want to delete  = ", paramId)

    if(userId===paramId){
        console.log("you can delete")
        let data = await UserCollection.findByIdAndDelete(userId)
        res.json({msg:"user deleted successfully",success:true})
    }
    else{
        console.log("you can delete only your account")
        res.json({msg:"not autherized to delete this account",success:false})
    }
    } catch (error) {
        res.json({msg:"error in deleting user",success:false ,error:error.message})
    }   

}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}

