import express from 'express';
import cors from 'cors';
import connectDb from './config/db.js';
import authRouter from './routes/authRouter.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';
dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)

connectDb().then(
    () => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server Started at port ${PORT}`);
        })
    }
).catch((err) => {
    console.log("Error in starting the server." + err)
})
