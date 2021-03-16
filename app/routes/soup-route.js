const Router = require('express').Router;
const { commons } = require('../config').context.middlewares;
const AlphabetSoupController = require('../controllers/alphabet-soup');
const getMiddlewares = require('../util/get-middlewares');


const router = Router();

const alphabetSoupController = new AlphabetSoupController();


router.post(
  '/soup', getMiddlewares(commons), alphabetSoupController.resolve
);

module.exports = router;
