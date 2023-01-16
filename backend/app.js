const express = require('express')
const app = express();
const port = 5050;
const mongoose = require('mongoose');
const {mongoUrl}  = require('./key');
const cors = require("cors")

app.use(cors())
require('./models/database') 
require('./models/post') 

app.use(express.json());
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl)
mongoose.connection.on("connected",()=>{
  console.log(" db successfully connected")
})

mongoose.connection.on("error",()=>{
  console.log(" db not  connected")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})