const soupUtils = require('../util/soup-utils');

const {
  setResponseWithOk,
  setResponseWithError
} = require('../util/common-response');

module.exports = function SoupController() {
  this.call = async (req) => {
    // eslint-disable-next-line
    const rows = req.body.rows;
    const columns = req.body.columns;
    const search = req.body.search;
    const searchReversed = search.split('').reverse().join().replace(/,/g, '');

    const grid = soupUtils.makeGrid(req.body);
    const horizontalSearch = soupUtils.horizontalSearch(grid, search, searchReversed);
    const verticalSearch = soupUtils.verticalSearch(grid, search, searchReversed, columns);
    const diagonalSearch = soupUtils.diagonalSearch(grid, rows, search, searchReversed);
    // eslint-disable-next-line
    const diagonalSearchReverse = soupUtils.diagonalSearch(grid, rows, search, searchReversed, true);
    const totalMatch = horizontalSearch + verticalSearch + diagonalSearch + diagonalSearchReverse;
    return totalMatch;
  };

  this.resolve = async (req, res) => {
    try {
      const response = await this.call(req);
      return setResponseWithOk(res, 200, response, 200);
    } catch (err) {
      return setResponseWithError(res, 500, err.message);
    }
  };
}