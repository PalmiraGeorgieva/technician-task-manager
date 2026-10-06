import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRouter from './src/routes/taskRouter.js';
import userRouter from './src/routes/userRouter.js';
import authRouter from './src/routes/authRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: 'TTM API is running!' });
});


app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
