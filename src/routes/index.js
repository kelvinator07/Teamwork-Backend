import express from 'express';
import { indexPage, messagesPage, addMessage } from '../controllers';
import { addAuth } from '../middlewares';
const indexRouter = express.Router();

indexRouter.get('/messages', addAuth, messagesPage);

indexRouter.post('/messages', addAuth, addMessage);

indexRouter.get('/', indexPage);

export default indexRouter;