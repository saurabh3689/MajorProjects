import mongoose from "mongoose"

const notifacationSchema = new mongoose.Schema({

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    type:{
        type:String,
        enum:["like", "comment", "connectionAccepted"]
    },
   relatedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    relatedPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
},{timestamps:true})

const Notification= mongoose.model("Notification", notifacationSchema)
export default Notification