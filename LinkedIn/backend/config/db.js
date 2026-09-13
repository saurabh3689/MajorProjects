import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log("db connected")          
  } catch (error) {
    console.error("Error connecting to db:", error)
  }
}

export default connectDb