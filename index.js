const express = require('express')
const app = express()
const userModel = require('./models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})






app.post("/create", function (req, res) {
  let { name, email, password } = req.body;

  if(!email || !name || !password){
    return res.json({success:false , message:"Missing Details"})
  }

  if(!validator.isEmail(email)){
    return res.json({success:false , message:"enter valid mail"})

  }

  if(password.length < 8){
    return res.json({success:false , message:"password should be greater than 8 "})

  }

  bcrypt.genSalt(10, (err, salt) => {

    bcrypt.hash(password, salt, async (err, hash) => {

      let created = await userModel.create({
        name,
        password: hash,
        email
        
      })

      let token = jwt.sign({ email }, "shhhhhmkkmknk")  // cookies bhejne ke liye 
      res.cookie("token", token)
      res.send(created)

    })
   
  })
})








app.post("/login",async function(req,res){
  let user =  await userModel.findOne({email: req.body.email}) ; // email ke basis pe find krega 
  if(!user) return res.send('something went wrong ')


    bcrypt.compare(req.body.password , user.password , function(err, result){
      if(result) res.send("You can Login ")  // compare krega password ko 
      else ( res.send('Something Went Wrong '))
    })
})

app.listen(3000)