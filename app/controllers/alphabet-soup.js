const soupUtils = require('../util/soup-utils');

const {
  setResponseWithOk,
  setResponseWithError
} = require('../util/common-response');

module.exports = function SoupController() {
  // eslint-disable-next-line
  this.doResponse = (horizontalSearch, verticalSearch, diagonalSearch, diagonalSearchReverse, grid) => {
    return {
      horizontal_search: horizontalSearch,
      vertical_search: verticalSearch,
      diagonal_search: diagonalSearch,
      diagonal_search_reverse: diagonalSearchReverse,
      total_matches: horizontalSearch + verticalSearch + diagonalSearch + diagonalSearchReverse,
      grid
    };
  };
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
    // eslint-disable-next-line
    return this.doResponse(horizontalSearch, verticalSearch, diagonalSearch, diagonalSearchReverse, grid);
  };

  this.resolve = async (req, res) => {
    try {
      const response = await this.call(req);
      return setResponseWithOk(res, 200, response, 200);
    } catch (err) {
      return setResponseWithError(res, 500, err.message);
    }
  };
};
