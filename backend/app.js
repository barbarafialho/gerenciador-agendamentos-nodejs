import express from 'express';
import router from './routes/router.js';

const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);