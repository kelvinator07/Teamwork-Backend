import moment from 'moment';

import { isEmpty } from '../helpers/validation';
import { errorMessage, successMessage, status } from '../helpers/status';
import Model from '../models/models';

const articles = new Model('articles');
const comments = new Model('comments');


exports.createArticle = async (req, res) => {

    const { title, description, category, share } = req.body;

    const authorid = req.body.userId;

    const createdat = moment(new Date());
    const updatedat = moment(new Date());

    if (isEmpty(title) || isEmpty(description) || isEmpty(category) || isEmpty(share)) {
        errorMessage.error = 'title, description, category and share field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    const createArticleQuery = `INSERT INTO
      articles(title, description, authorid, category, share, createdat, updatedat)
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
    const values = [ title, description, authorid, category, share, createdat, updatedat ];

    try {

        const { rows } = await articles.query(createArticleQuery, values);
        const dbResponse = rows[0];
        const { id, title, createdat } = dbResponse;
        return res.status(status.created).json({
            status: 'success',
            data: {
                message: 'Article successfully created',
                articleId: id,
                title: title,
                createdOn: createdat,
            },
        });
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Unable to add Article';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

exports.getArticle = async (req, res) => {

    const getArticleQuery = 'SELECT * FROM articles WHERE id = $1';
    let dataResponse = {};

    try {

        const { rows } = await articles.query(getArticleQuery, [req.params.id]);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMessage.error = 'Article Not Found!';
            return res.status(status.notfound).send(errorMessage);
        }

        dataResponse = dbResponse;

    } catch (error) {
        errorMessage.error = 'An error Occurred 2';
        return res.status(status.error).send(errorMessage);
    }

    const getArticleCommentsQuery = 'SELECT * FROM comments WHERE postid = $1';

    try {

        const {id, title, description, createdat} = dataResponse;

        const { rows } = await comments.query(getArticleCommentsQuery, [id]);
        const dbResponse = rows[0];

        const commentsArray = [];

        if (dbResponse !== undefined) {
            rows.map((comment) => (
                commentsArray.push({
                    commentId: comment.id,
                    comment: comment.description,
                    authorId: comment.authorid,
                })
            ));
        }
        
        return res.status(status.success).json({
            status: 'success',
            data: {
                id: id,
                createdOn: createdat,
                title: title,
                article: description,
                comments: commentsArray,
            },
        });

    } catch (error) {
        console.log("error ", error);
        errorMessage.error = 'An error Occurred';
        return res.status(status.error).send(errorMessage);
    }
};

exports.editArticle = async (req, res) => {

    const updatedat = moment(new Date());

    const postId = req.params.id;
    const { title, description, category, share,  userId } = req.body;
    const authorId = userId;

    const findArticleQuery = 'SELECT * FROM articles WHERE id=$1 AND authorId=$2';
    const updateArticle = `UPDATE articles SET title=$1, description=$2, category=$3, share=$4, updatedat=$5 WHERE id=$6 returning *`;

    try {
        const { rows } = await articles.query(findArticleQuery, [postId, authorId]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Article Cannot be found';
            return res.status(status.notfound).send(errorMessage);
        }

        const values = [ req.body.title, req.body.description, category, share, updatedat, postId ];
        const response = await articles.query(updateArticle, values);
        const dbResult = response.rows[0];
        const { title, description } = dbResult;
        return res.status(status.success).json({
            status: 'success',
            data: {
                message: 'Article successfully updated',
                title,
                article: description,
            },
        });
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'Duplicate';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

exports.deleteArticle = async (req, res) => {

    // Delete Article In DB
    const postId = req.params.id;
    const authorid = req.body.userId;

    const deleteArticleQuery = 'DELETE FROM articles WHERE id=$1 AND authorid = $2 returning *';

    try {
        const { rows } = await articles.query(deleteArticleQuery, [postId, authorid]);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMessage.error = 'Article Not Found';
            return res.status(status.notfound).send(errorMessage);
        }

        return res.status(status.success).json({
            status: 'success',
            data: {
                message: 'Article successfully deleted',
            },
        });
    } catch (error) {
        return res.status(status.error).send(error);
    }
};

exports.commentArticle = async (req, res) => {

    const postId = req.params.id;
    const {description, userId} = req.body;
    const authorId = userId;

    const findArticleQuery = 'SELECT * FROM articles WHERE id=$1';
    const commentArticle = `INSERT INTO comments(description, authorid, postid, createdat, updatedat)
      VALUES($1, $2, $3, $4, $5) returning *`;

    const createdat = moment(new Date());
    const updatedat = moment(new Date());

    const values = [description, authorId, postId, createdat, updatedat];
    let title;

    try {
        const { rows } = await articles.query(findArticleQuery, [postId]);
        console.log("rows ", rows);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Article Cannot be found';
            return res.status(status.notfound).send(errorMessage);
        }
        title  = dbResponse.title;

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

    try {
        const { rows } = await articles.query(commentArticle, values);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'Error while adding Comment!';
            return res.status(status.conflict).send(errorMessage);
        }

        const {createdat} = dbResponse;

        return res.status(status.created).json({
            status: 'success',
            data: {
                message: 'Comment successfully created',
                createdOn: createdat,
                articleTitle: title,
                // article: article,
                comment: description,
            },
        });

        // successMessage.data = rows;
        // return res.status(status.created).send(successMessage);

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

exports.getAllArticles = async (req, res) => {

    const getAllArticlesQuery = 'SELECT * FROM articles WHERE authorid=$1 ORDER BY createdat DESC';
    const authorid = req.body.userId;

    try {
        const { rows } = await articles.query(getAllArticlesQuery, [authorid]);

        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }
};
