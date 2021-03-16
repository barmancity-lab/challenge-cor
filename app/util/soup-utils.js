/* eslint-disable arrow-parens */

  // eslint-disable-next-line
  

  const occurrences = (string, subString, allowOverlapping) => {
    // eslint-disable-next-line
    string += '';
    // eslint-disable-next-line
    subString += '';
    if (subString.length <= 0) return (string.length + 1);
    // eslint-disable-next-line
    let n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;
    // eslint-disable-next-line
    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        // eslint-disable-next-line no-plusplus
        ++n;
        pos += step;
      } else break;
    }
    return n;
  };


  const makeGrid = (body) => {
    const soup = body.soup;
    const rows = body.rows;
    const columns = body.columns;
    let re = columns;
    let rs = 0;
    const rowArr = [];

  // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rows; i++) {
      rowArr.push(soup.substring(rs, re));
      re += columns;
      rs += columns;
    }
    return rowArr;
  };

  const horizontalSearch = (rowArr, search, searchReversed) => {
    let matches = 0;
    // eslint-disable-next-line
    rowArr.forEach(element => {
      const count = occurrences(element, search);
      const countReverse = occurrences(element, searchReversed);
      matches += count + countReverse;
    });
    return matches;
  };

  const verticalSearch = (rowArr, search, searchReversed, columns) => {
    let matches = 0;
  // eslint-disable-next-line no-plusplus
    for (let i = 0; i < columns; i++) {
      let str = '';
    // eslint-disable-next-line
      rowArr.forEach(element => {
        str += element.substring(i, 1 + i);
      });
      const count = occurrences(str, search);
      const countReverse = occurrences(str, searchReversed);
      matches += count + countReverse;
    }
    return matches;
  };

  const diagonalSearch = (rowArr, rows, search, searchReversed, reverse = false) => {
    let matches = 0;
    let diagonal = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rows; i++) {
      if (reverse) {
        // eslint-disable-next-line
        diagonal += rowArr[i].split('').reverse()[i];
      } else {
        // eslint-disable-next-line
        diagonal += rowArr[i].split('')[i];
      }
    }
    const count = occurrences(diagonal, search);
    const countReverse = occurrences(diagonal, searchReversed);

    matches += count + countReverse;
    return matches;
  };
  module.exports.makeGrid = makeGrid;
  module.exports.horizontalSearch = horizontalSearch;
  module.exports.verticalSearch = verticalSearch;
  module.exports.diagonalSearch = diagonalSearch;
