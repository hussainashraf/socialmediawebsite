const mongoose = require('mongoose')
const{ObjectID} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
  body:{
      type:String,
      required:true
  },
  photo:{
      type:String,
      required:true
  },
  postedBy:{
      type:ObjectID,
      ref:"USER"
  }
})

mongoose.model("POST",postSchema);