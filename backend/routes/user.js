const express = require("express");
const { z } = require("zod");
const User = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { authMiddleware } = require("./middleware");
const userRouter = express.Router();

//signup
const signupSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
userRouter.post("/signup", async (req, res) => {
  const validation = signupSchema.safeParse(req.body);
  if(!validation.success){
    res.status(411).json({
      message: "Incorrect Inputs"
    })
  }
  const existing =await User.findOne({username: validation.data.username})
  if(existing){
    res.status(411).json({
      message:"Username already exist"
    })
  }
  const newUser =await User.create({
    username: validation.data.username,
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    password: validation.data.password
  })
 
  const token = jwt.sign(newUser._id,JWT_SECRET)
  res.status(200).json({
    message: 'User Create Successful',
    token: token
  })
});

//signin
const signinSchema = z.object({
  username: z.string(),
  password: z.string()
})
userRouter.post('/signin',async (req,res)=>{
  const signinvalidation = signinSchema.safeParse(req.body)
  if(!signinvalidation){
    res.status(411).json('Incorrect Inputs');
  }
  const user = await User.findOne({
    username: signinvalidation.data.username,
    password: signinvalidation.data.password
  })
  if(!user){
    res.status(411).json({
      message: "Incorrect Username or Password"
    })
  }
 
  const token = jwt.sign({
    userId: user._id,
  }, JWT_SECRET)
  res.status(200).json({
    message: 'Authentication Successful',
    token: token
  }).redirect('/dashboard')
})

//update the information
userRouter.put('/',authMiddleware,async (req,res)=>{
  const data = req.body
  console.log(req.userId)
  console.log(data)
  const userInfo =await User.findOneAndUpdate({
    _id: req.userId
  },
  data
)
  if(!userInfo){
    res.status(500).json({
      message: 'something went wrong!'
    })
  }
  res.status(201).json({
    message: "Data updated Successful"
  })
})

//Search
userRouter('/',(req,res)=>{
  const value = req.query.filter

})

module.exports = userRouter;
