import User,{ validateUser } from "../models/user.js";


import hash from '../middleware/hashpassword.js'
import token from '../middleware/token.js'
// import User from "../models/user.js";


const register = async(req,res) =>{
    const email = req.body.email
  
// console.log(email);
    const {error}=validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const exUser=await User.findOne({email: email})
    if(exUser){
        res.send("email is already taken")
    }
    else{
        try {
            let hashPassword=await hash.hashGenerater(req.body.password)
        let user=new User({  
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:hashPassword,
        })
        const result=await user.save()
        res.send(user)
    //    res.send("welcome")

        } catch (error) {
            res.send(error.message)
        }

    }

}
const login=async(req,res) => {

    const email=req.body.email
    const password=req.body.password

    // const {error}=validateStudent(req.body)
    // if(error) return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email:email})
    if(user){
        const hashValue=await hash.hashValidater(password,user.password)
        if(!hashValue){
            res.send("Invalid Password")
        }
        else{
            try {
                let data=user.toObject();
            let id=data._id;
            // console.log(id);
          
    
            const getToken =await token.tokenGenrater(id);

            res.send(getToken);
            } catch (error) {
                res.send(error.message);
            }
        }
    }else{
        res.send("email id is Invalid")
    }
}

const getUser=async(req,res)=>{
    let result=await User.find().select('-password')
    res.send(result)
}

export default {register,login,getUser}