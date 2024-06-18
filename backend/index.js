const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

dotenv.config()

//middlewares
app.use(cors({origin: "*", credentials: true}));
app.use(cookieParser);
app.use(express.json());

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
    } catch (err) {
      throw err;
    }
  };
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

app.listen(8000, ()=>{
    connect();
    console.log("server is running")
})