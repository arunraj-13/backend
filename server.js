import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import "./models/question.js"
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()

app.use(cors())
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:8080/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//   });


app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
})
app.use(express.json())

const DataBase =() =>{
      mongoose.connect(process.env.URL);
      mongoose.connection.on('connected',()=>{
        console.log("Connected to database")
      })
      mongoose.connection.on('error',(err)=>{
        console.log(err)
      })
}
DataBase();
const Question = mongoose.model("Question")

app.post('/question',(req,res)=>{
  console.log(`Questions for ${req.body.chapter} recieved`)
  Question.find({'chapter': req.body.chapter})
  .then((question) => {
    const Essay = question.filter((val) => {
      if(val.weightage == 15){
        return val
      }})
    const shortNotes = question.filter((val) => {
        if(val.weightage == 5){
          return val
        }})
    console.log(Essay)
    console.log(shortNotes)
    res.json({Essay, shortNotes})})
})

    
app.post('/que',(req,res)=>{
  console.log(req.body)
  const {subject,chapter,title,weightage, repeated,book1,book2} = req.body 
  if(!subject || !chapter || !title || !weightage||!repeated){
    return  res.status(422).json({error:"Plase add all the fields"})
  }
  const question = new Question({
      subject,
      chapter,
      title,
      weightage,
      repeated,
      book1,
      book2
  })
  question.save().then(result=>{
      res.json({post:result})
  })
  .catch(err=>{
      console.log(err)
  })})


