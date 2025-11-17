import express from 'express';
import router from './routes/router.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http:/localhost:5173"
}))

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);