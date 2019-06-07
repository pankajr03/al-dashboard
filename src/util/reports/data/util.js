const hl = require("highland");
const request = require("request");

const post = hl.wrapCallback(request.post);

const {
  endPoints: { base },
  baseRequest,
  baseBody
} = require("./constants");

const createUrl = (url, endPoint) => `${url}/${endPoint}`;

const parseBuffer = stream =>
  stream
    .collect()
    .map(buffers => buffers.join(""))
    .map(res => JSON.parse(res));

const streamData = (query, endPoint) => {
  const body = Object.assign(
    { request: Object.assign(query, baseRequest) },
    baseBody
  );
  return hl(
    post({
      uri: createUrl(base, endPoint),
      body,
      json: true
    })
  )
    .pluck("body")
    .flatten();
};

module.exports = {
  createUrl,
  parseBuffer,
  streamData
};
