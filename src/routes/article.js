import express from 'express';
import { addAuth } from '../middlewares';
import articleCtrl from '../controllers/article';

const router = express.Router();


router.get('/articles', addAuth, articleCtrl.getAllArticles);

router.post('/articles', addAuth, articleCtrl.createArticle);

router.get('/articles/:id', addAuth, articleCtrl.getArticle);

router.put('/articles/:id', addAuth, articleCtrl.editArticle);

router.delete('/articles/:id', addAuth, articleCtrl.deleteArticle);

router.post('/articles/:id/comment', addAuth, articleCtrl.commentArticle);


export default router;
