import { errorMessage, status } from '../helpers/status';
import Model from '../models/models';

const articles = new Model('articles');
const gifs = new Model('gifs');

exports.getAllFeed = async (req, res) => {
    console.log('req ');
    const getAllArticlesQuery = '*';
    let feeds = [];

    try {
        const { rows } = await articles.select(getAllArticlesQuery);
        const dbResponse = rows;
        feeds = [...dbResponse];
        console.log('Articles ', feeds);
    } catch (error) {
        errorMessage.error = 'An error Occured';
        return res.status(status.error).send(errorMessage);
    }

    const getAllGifsQuery = '*';

    try {

        const { rows } = await gifs.select(getAllGifsQuery);
        const dbResponse = rows;
        console.log('dbResponse ', dbResponse);

        feeds = [ ...feeds, ...dbResponse];
        console.log('feeds ', feeds);

        const sorted = feeds.sort((a, b) =>
            new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
            console.log('sorted ', sorted);

        return res.status(status.success).json({
            status: 'success',
            count: feeds.length,
            data: sorted,
        });
    } catch (error) {
        errorMessage.error = 'An error Occurred';
        return res.status(status.error).send(errorMessage);
    }
};
