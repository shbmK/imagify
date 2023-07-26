import * as dotenv from 'dotenv'
dotenv.config()

import { Configuration,OpenAIApi } from 'openai'
const configuration=new Configuration({
    apiKey : process.env.OPENAI,
})
const openai=new OpenAIApi(configuration)

import express from 'express'
import cors from 'cors'
const PORT=process.env.PORT || 8080
const app=express()
app.use(cors())
app.use(express.json())
app.post('/dream',async (req,res)=>{
    try{const prompt=req.body.prompt            //wrapping in try..catch incase of error
    const aiResponse=await openai.createImage({
        prompt,
        n:1,
        size: '1024x1024',
    })
    const image=aiResponse.data.data[0].url
    res.send({image})
    }catch(err){                                //sending error response to client
        console.log(err)
        res.status(500).send(err?.response.data.error.message||"Something went wrong")
    }
})

app.listen(PORT,()=>console.log("running"))

