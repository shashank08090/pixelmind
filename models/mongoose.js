const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema=mongoose.Schema({
fullName:{
    type:String,
},
id:{
    type:String,   
},
address:{
    type:String,
},
phoneNumber:{
    type:String,
},
dob:{
    type:Date,
},
email:{
    type:mongoose.SchemaTypes.Email,
},
avatar:
    {
        data: Buffer,
        contentType: String
    },
   
})



module.exports = User = mongoose.model('user', userSchema)