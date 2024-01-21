import express from 'express';

const app=  express();
const port =3001;
import mongoose from'mongoose';
//import * as cors from 'cors';
import authRoutes from '../server/routes/auth';
import userRouter from '../server/routes/route';
import cors from 'cors';
app.use(cors())


app.use(express.json());
app.use("/auth", authRoutes);
app.use("/route", userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(
    "mongodb+srv://bhavya601474:bhavyaMongoDb@cluster0.selravw.mongodb.net/",{dbName: "recipes"});
