import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { config } from 'dotenv';
import { connectDB } from './config/db';

config()
connectDB()

//עליו מעמיסים את כל הניתובים
const app=express();

//json ע"מ שהשרת יוכל לקרוא נתונים שנשלחו בצורת קובץ 
app.use(express.json());

//body-ע"מ שהשרת יוכל לקרוא נתונים שנשלחו בצורת טופס
app.use(express.urlencoded({ extended: true }));

//אחרי כל בקשה השרת מדפיס את הנתונים
app.use(morgan('dev'));

app.use(cors())

//middlewares before request

app.get('/',(req, res) => {
    res.json('HELLO TO YOU');
})

//middlewares after request

export default app;