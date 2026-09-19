import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRouter from './src/routes/taskRouter.js';
import userRouter from './src/routes/userRouter.js';


dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'TTM API is running!' });
});


app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});