const person = require("./person");
const answer = require("./answer");
const family = require("./family");
const registration = require("./registration");
const season = require("./season");
const session = require("./session");
const sessionOption = require("./sessionOption");
const tuition = require("./tuition");

const functionMap = {
  person,
  answer,
  family,
  registration,
  season,
  session,
  sessionOption,
  tuition
};

module.exports = (event, context, cb) => {
  const { queryStringParameters, body } = event;
  const { functionName } = context;
  functionMap[functionName](
    queryStringParameters || (body && JSON.parse(body)) || {}
  )
    .stopOnError(err =>
      cb(null, {
        statusCode: "400",
        body: JSON.stringify(err.message),
        headers: { "Content-Type": "application/json" }
      })
    )
    .toArray(data =>
      cb(null, {
        statusCode: "200",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" }
      })
    );
};
