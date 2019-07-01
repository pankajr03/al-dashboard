const hl = require("highland");

const { streamData } = require("../util");
const {
  endPoints: {
    person: { answer }
  }
} = require("../constants");

module.exports = ({ personIds }) => {
  if (!personIds) return hl.fromError(new Error("personIds is required"));
  return streamData({ personIds }, answer);
};
