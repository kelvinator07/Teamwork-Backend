import express from 'express';
import { indexPage, messagesPage } from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/messages', messagesPage);
indexRouter.get('/', indexPage);

export default indexRouter;