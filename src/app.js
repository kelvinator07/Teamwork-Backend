import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import { welcomeVariable } from './settings';
import userRoutes from './routes/user';
import articleRoutes from './routes/article';
import gifRoutes from './routes/gif';
import feedRoutes from './routes/feed';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({ message: `${welcomeVariable} ${process.env.PORT} ` });
});

debugger;

app.use('/api/v1', feedRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', gifRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', indexRouter);

export default app;