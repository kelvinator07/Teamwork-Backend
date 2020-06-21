import express from 'express';
import { addAuth } from '../middlewares';
import gifCtrl from '../controllers/gif';

const router = express.Router();

router.post('/gifs', addAuth, gifCtrl.createGif);

router.get('/gifs/:id', addAuth, gifCtrl.getGif);

router.delete('/gifs/:id', addAuth, gifCtrl.deleteGif);

router.post('/gifs/:id/comment', addAuth, gifCtrl.commentGif);


export default router;
