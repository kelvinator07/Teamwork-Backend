import express from 'express';
import { addAuth } from '../middlewares';
import feedCtrl from '../controllers/feed';

const router = express.Router();


router.get('/feed', addAuth, feedCtrl.getAllFeed);


export default router;
