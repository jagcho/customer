const express = require("express")
const route = require("./routes/route")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())

app.use("/", route)

const url = "mongodb+srv://Jagcho:71nEXJtXcYfVx8T6@cluster0.5bg4mzz.mongodb.net/Customers"
mongoose.connect(url, {useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=> console.log(err.message))

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("App is running on port "+ " "+ port)
})