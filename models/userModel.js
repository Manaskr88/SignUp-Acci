const  mongoose = require ('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/accilive`)

const userSchema = mongoose.Schema ({

 name:{
    type:String,
 },

 email:{
    type:String,
 },

 password:{
    type:String,
 }

})

module.exports = mongoose.model('user' , userSchema)