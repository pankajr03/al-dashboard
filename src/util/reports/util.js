const hl = require('highland');
const XLSX = require('xlsx');
const _ = require('lodash');

const { endPoints: { base: api } } = require('./constants');

const createUrl = (url, endPoint) => `${url}/${endPoint}`;

const parseBuffer = stream => stream
  .collect()
  .map(buffers => buffers.join(''))
  .map(res => JSON.parse(res));

const streamData = (body, endPoint) => hl(fetch(createUrl(api, endPoint)), {
  mode: 'no-cors',
  method: 'POST',
  body: JSON.stringify(body),
})
  .flatMap(response => hl(response.json()))
  .pluck('data')
  .flatten();

const assignDocumentData = (documents, getter, localKey, foreignKey, as) => getter({ [`${foreignKey}s`]: _.map(documents, localKey) })
  .collect()
  .flatMap((docsToAdd) => {
    const docsToAddByForeignKey = _.keyBy(docsToAdd, foreignKey);
    return hl(documents)
      .map(document => Object.assign({
        [`${as}`]: docsToAddByForeignKey[document[localKey]] || {},
      }, document));
  });

const createBook = (sheets, currentBook, headers, reportName) => {
  let currentSheet = 0;
  return hl(sheets)
    .doto(() => { currentSheet += 1; })
    .reduce((wb, sheet) => {
      const ws = XLSX.utils.json_to_sheet(sheet, { header: Object.keys(headers), skipHeader: true });
      XLSX.utils.book_append_sheet(wb, ws, `sheet${currentSheet}`);
      return wb;
    }, XLSX.utils.book_new())
    .map(wb => XLSX.writeFile(wb, `${reportName}-book${currentBook}-${new Date()}.xlsx`));
};

module.exports = {
  createUrl,
  parseBuffer,
  streamData,
  createBook,
  assignDocumentData,
};

