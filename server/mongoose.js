const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://copy-code:iKMGkrd4Y4rKy6Cf@cluster0.un7zsws.mongodb.net/")
const newSchema=new mongoose.Schema({
    uniq_id:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
   
})
const UserData = mongoose.model("collection",newSchema)
module.exports=UserData