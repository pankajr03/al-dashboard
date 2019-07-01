const hl = require("highland");

const { streamData } = require("../util");
const {
  endPoints: {
    product: { session }
  }
} = require("../constants");

module.exports = ({ sessionIds }) => {
  if (!sessionIds) return hl.fromError(new Error("sessionIds is required"));
  return streamData({ sessionIds }, session);
};
