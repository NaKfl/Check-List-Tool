const { parseFile } = require('@fast-csv/parse');
const { writeToPath } = require('@fast-csv/format');

const readCSV = (path) =>
  new Promise((resolve, reject) => {
    const lines = [];
    parseFile(path, { headers: true, delimiter: ';' })
      .on('error', (error) => reject(error))
      .on('data', (line) => lines.push(line))
      .on('end', () => resolve(lines));
  });

const writeCSV = (path, lines) =>
  new Promise((resolve, reject) => {
    writeToPath(path, lines, {
      delimiter: ';',
      rowDelimiter: '\n',
      headers: true,
    })
      .on('error', (error) => reject(error))
      .on('finish', () => resolve());
  });

module.exports = {
  readCSV,
  writeCSV,
};
