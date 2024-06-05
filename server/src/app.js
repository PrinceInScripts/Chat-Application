import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from "morgan"
import connectDB from './db/index.js';
const app = express();

const corsConfig = {
  origin: process.env.BASE_URL,
  credentials: true,
};



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(morgan('dev'))

connectDB()
export default app;