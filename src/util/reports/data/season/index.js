const { streamData } = require("../util");
const {
  endPoints: {
    product: { season }
  }
} = require("../constants");

module.exports = ({ seasons = [] }) => streamData({ seasons }, season);
