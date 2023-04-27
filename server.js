const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.get("/getData",async(req,res)=>{
    let records= await User.find()
    .distinct("gender")
    .select(
        {
        id:1,
        firstName:1,
        lastName:1,
        age:1,
        department:1,
        _id:0
    }
    )
    .skip(100).limit(100)
    .sort({firstName:1})
    .and({department:"Human Resources",gender:"Male",country:"Brazil", age:{$gt:17,$lt:60}})
    .or({department:"Accounting"},{gender:"Male"},{country:"Russia"}, {age:{$gt:17,$lt:60}}
    )
    .count();
    
res.json(records);
});
app.listen(4444,()=>{
    console.log("Listening port 4444");
})
let connectToMDB=async()=>{
    try{
 await mongoose.connect("mongodb://localhost:27017/India");
 console.log("Connected to MDB");
 getDataFromDB();
 updateValueInDB();
 deleteFromDB();
    }catch(error){
        console.log(error);
        console.log("Unable to connect to MDB");
    }
}
let UsersSchema=new mongoose.Schema({
    id:Number,
    firstName:String,
    lastName:String,
    email:String,
    gender:String,
    country:String,
    age:Number,
    department:String,
    city:String
});
let User=new mongoose.model("users",UsersSchema);
connectToMDB();
let getDataFromDB=async()=>{
 let records= await User.find();
 console.log(records);
};
let updateValueInDB=async()=>{
try{
    await User.updateMany(
{_id:"6417ee14a56ceffb0958547c"},
{firstName:"Laxmi",lastName:"Reddy"}
        // {country:"India"},{country:"Bharath"}
        )
    console.log("Updated Successfully");
}catch(error){
    console.log("Something wrong in updating");
}
}
let deleteFromDB=async()=>{
    try{
        await User.deleteMany({
            country:"China",gender:"Female"
        })
        console.log("Deleted Successfully");
    }catch(error){
        console.log("Something wrong in deleting"); 
    }
}