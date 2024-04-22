const mongoose=require('mongoose');
require('dotenv').config(); 


const mongoURI = process.env.MONGODB_URL;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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