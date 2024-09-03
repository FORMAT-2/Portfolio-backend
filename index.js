const express = require('express');
const mongoose = require('mongoose');
const Message = require('./message.model');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

app.listen(3000,()=>{
    console.log("connected");
});

mongoose.connect('mongodb+srv://gensogones:1234@cluster0.tzmgo60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log('connected to database'));

const sendMessage = async(req,res)=>{
    const {name, mail, message} = req.body;
    if(!name){
        return res.status(400).json('Enter your name please');
    }
    if(!mail){
        return res.status(400).json('Enter your mail please');
    }
    if(!message){
        return res.status(400).json('Enter message');
    }
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.MAIL,
        to: mail,
        subject: "Automated response",
        text: "Thanks for messaging me, I will get back to you as soon as possible",
      };

      transporter.sendMail(mailOptions,(err,info)=>{
        if(err) {
            console.log(err);
        }
        else{
            console.log("mail sent : ",info.response);
        }        
      })

    const createMessageObj = new Message({name:name,mail:mail,message:message});
    await createMessageObj.save();


    res.status(200).json('message successfully sent');
    
}
app.post('/send-message', sendMessage);

