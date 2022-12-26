import express from "express";

const router = express.Router()

router.get('/question',(req,res)=>{
    res.send({"msg": "Data recieved"})
})

export default router