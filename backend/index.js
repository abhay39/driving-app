import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './db/dbconect.js';
import userRoutes from './routes/userRoutes.js';
import riderRoutes from './routes/riderRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/",async(req,res)=>{
    try{
        res.status(200).json({
            message: "Welcome to the Node.js server!"
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: e.message
        })
    }
})

// route for user
app.use("/user",userRoutes);


// route for rider
app.use("/rider",riderRoutes);

connectDB();

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})