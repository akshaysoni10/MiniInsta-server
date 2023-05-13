import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'; 
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
   res.send('APP IS RUNNING');
})

const CONNECT_URL = 'mongodb+srv://mern:1ZOO1mS2KBiZfek9@cluster0.mmswdwi.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URL, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)))
   .catch((error) => console.log(`${error} did not connect`));
mongoose.set('strictQuery', false);
