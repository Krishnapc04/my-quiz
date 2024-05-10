const express = require("express")
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello i ma running')
})

app.listen(5000)
