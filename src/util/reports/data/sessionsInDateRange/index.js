const hl = require('highland');
const moment = require('moment');

const { streamData } = require('../util');
const { endPoints: { product: { season, session } } } = require('../constants');


module.exports = ({ startDate, endDate }) => {
  if (!startDate) return hl.fromError(new Error('startDate is required'));
  if (!endDate) return hl.fromError(new Error('endDate is required'));
  startDate = moment(startDate);
  endDate = moment(endDate);
  return streamData({ seasons: [] }, season)
    .pluck('sessionIds')
    .flatten()
    .flatMap(sessionIds => streamData({ sessionIds }, session))
    .filter(({
      startDate: { day: startDay, month: startMonth, year: startYear },
      endDate: { day: endDay, month: endMonth, year: endYear },
    }) => {
      const start = moment(`${startYear}-${startMonth}-${startDay}`, 'YYYY-MM-DD');
      const end = moment(`${endYear}-${endMonth}-${endDay}`, 'YYYY-MM-DD');
      return ((moment(start).isSameOrBefore(startDate, 'day') && moment(end).isSameOrAfter(startDate, 'day')) ||
            (moment(end).isSameOrAfter(endDate, 'day') && moment(start).isSameOrBefore(endDate, 'day')) ||
            (moment(start).isSameOrAfter(startDate, 'day') && moment(end).isSameOrBefore(endDate, 'day')) ||
            (moment(start).isSameOrBefore(startDate, 'day') && moment(end).isSameOrAfter(endDate, 'day')));
    });
};
