const mongoose = require('mongoose')

const dbUrl = "mongodb+srv://nilesh7575:nilesh7575@centralizereservationsy.hcnk4.mongodb.net/StoreDatabase?retryWrites=true&w=majority"




mongoose.connect(
    dbUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err)=>{
        if(!err){
            console.log("DB Connected...!")
        }else{
            console.log("Connection Failed...!",err)
        }
    }
)