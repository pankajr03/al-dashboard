const hl = require("highland");

const { streamData } = require("../util");
const {
  endPoints: {
    product: { sessionOption }
  }
} = require("../constants");

module.exports = ({ sessionOptionIds }) => {
  if (!sessionOptionIds)
    return hl.fromError(new Error("sessionOptionIds is required"));
  return streamData({ sessionOptionIds }, sessionOption);
};
