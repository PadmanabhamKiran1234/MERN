import express, { request, response } from "express";
import { PORT ,mongodbURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Middleware for parsing request data
app.use(express.json());

//Middleware for handling CORS policy
//Method 1: Allow all Orgins with Default of cors(*)
app.use(cors());

//Method 2 : Allow Custom Origins

// app.use(cors({
//     origin : 'http://localhost:3000',
//     methods : ['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(200).send('Welcome to Book Store')
});

app.use('/books',booksRoute);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to Database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    // You might want to terminate the application or handle the error appropriately
  });