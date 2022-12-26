import mongoose from 'mongoose'
const questionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    weightage:{
        type: Number,
    },
    repeated:{
        type: Number,
        required:true
    },
    book1:{
        type: Number
    },
    book2:{
        type: Number
    },
},{timestamps:true})

mongoose.model("Question",questionSchema)