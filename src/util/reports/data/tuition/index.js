const hl = require("highland");

const { streamData } = require("../util");
const {
  endPoints: {
    product: { tuition }
  }
} = require("../constants");

module.exports = ({ tuitionIds }) => {
  if (!tuitionIds) return hl.fromError(new Error("tuitionIds is required"));
  return streamData({ tuitionIds }, tuition);
};
