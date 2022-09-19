import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema=new mongoose.Schema({
  fname:{
        type:String,
        required:true
    },
  lname:{
        type:String,
        required:true
    },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
})

const User = mongoose.model('User',userSchema );
//Joi Validation
function validateUser(User) {
  const schema = {
    fname:Joi.string().min(5).max(50).required(),
    lname:Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  };

  return (User, schema);
}
//Schema export
export default User;

//Validation export
export {validateUser}

