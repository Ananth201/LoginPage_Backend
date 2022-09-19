import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import User from "./routes/userRoute.js";
import dotenv from 'dotenv'
dotenv.config() 


//Middlewares
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());


//Sample Route
app.get('/',(req,res)=>{
    res.send("Hello")
})

//Routes
app.use('/api',User)

//DataBase Connection
mongoose.connect('mongodb://localhost/crud_operation')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

//Server Running Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


