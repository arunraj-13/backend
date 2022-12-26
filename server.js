import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import "./models/question.js"

const app = express()
const PORT = 5000 || process.env.PORT

dotenv.config()

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


