const Router = require('express').Router;
const AlphabetSoupController = require('../controllers/alphabet-soup');


const router = Router();

const alphabetSoupController = new AlphabetSoupController();


router.post(
  '/soup', alphabetSoupController.resolve
);

module.exports = router;
