const csvStringify = require('csv-stringify');

const {
  streamSessions,
  streamRegistrations,
  streamPeople,
  streamAnswers,
  streamTuitions,
} = require('./data');

const signInReportColumns = {
  start: 'Start Date',
  end: 'End Date',
  campCode: 'Camp Code',
  campName: 'Camp Name',
  firstName: 'First Name',
  lastName: 'Last Name',
  nameString: 'Names',
  numberString: 'Numbers',
  sunIn: 'Sun - In',
  sunOut: 'Sun - Out',
  monIn: 'Mon - In',
  monOut: 'Mon - Out',
  tuesIn: 'Tues - In',
  tuesOut: 'Tues - Out',
  wedIn: 'Wed - In',
  wedOut: 'Wed - Out',
  thursIn: 'Thurs - In',
  thursOut: 'Thurs - Out',
  friIn: 'Fri - In',
  friOut: 'Fri - Out',
  satIn: 'Sat - In',
  satOut: 'Sat - Out',
  canAdministerMedicine: 'Allowed To Administer Medicine',
  shirtSize: 'Shirt Size',
  unApproved: 'Unapproved',
};

const assignQuestionData = (stream, session) => stream
  .pluck('questionAnswers')
  .flatten()
  .filter(({ label }) => /Person/.test(label) || /Not Authorized/.test(label) || /Shirt Size/.test(label) || /over-the-counter/i.test(label))
  .reduce((accum, { label, answer }) => {
    accum.canAdministerMedicine = accum.canAdministerMedicine || (/over-the-counter/i.test(label) && answer);
    accum.unApproved = accum.unApproved || (/Not Authorized/i.test(label) && answer);
    accum.shirtSize = accum.shirtSize || (/Shirt Size/.test(label) && answer);
    if (/Person/.test(label)) {
      accum.approved[label[8]] = accum.approved[label[8]] || {};
      if (/Phone Number/.test(label)) { accum.approved[label[8]].phoneNumber = answer; }
      if (/Full Name/.test(label)) { accum.approved[label[8]].fullName = answer; }
    }
    return accum;
  }, { canAdministerMedicine: '', unApproved: '', approved: {}, shirtSize: '' })
  .map(({ approved, ...rest }) => {
    const names = [];
    const numbers = [];
    Object.values(approved)
      .forEach(({ phoneNumber, fullName }) => {
        names.push(fullName);
        numbers.push(phoneNumber);
      });
    const nameString = names.join('~');
    const numberString = numbers.join('~');
    return Object.assign(rest, { nameString, numberString });
  })
  .map(data => Object.assign({}, data, session));

const formatSignInReport = (data) => {
  const {
    location: { name: locationName },
    startDate: { day: startDay, month: startMonth, year: startYear },
    endDate: { day: endDay, month: endMonth, year: endYear },
    name: sessionName,
    person = {},
    tuition = {},
    nameString,
    numberString,
    canAdministerMedicine,
    shirtSize,
    unApproved,
  } = data;
  const { firstName, lastName } = person;
  const { name: tuitionName } = tuition;
  return {
    firstName,
    lastName,
    nameString,
    numberString,
    canAdministerMedicine,
    shirtSize,
    unApproved,
    start: `${startMonth}/${startDay}/${startYear}`,
    end: `${endMonth}/${endDay}/${endYear}`,
    sessionName,
    locationName,
    campCode: tuitionName,
    campName: `${sessionName}-${locationName}`,
  };
};


const streamSignInReportData = session => streamRegistrations({ sessionIds: [session.sessionId] })
  .filter(({ registrationDetails }) => !!registrationDetails)
  .pluck('registrationDetails')
  .flatten()
  .filter(({ cancelled }) => !cancelled)
  .map(registration => Object.assign({ registration }, session))
  .map(data => streamTuitions({ tuitionIds: [data.registration.tuitionId] })
    .map(tuition => Object.assign({ tuition }, data)))
  .mergeWithLimit(10)
  .map(data => streamPeople({ personIds: [data.personId] })
    .map(person => Object.assign({ person }, data)))
  .mergeWithLimit(10)
  .map(data => streamAnswers({ personIds: [data.personId] })
    .through(stream => assignQuestionData(stream, data)))
  .mergeWithLimit(10)
  .map(formatSignInReport);

module.exports = sessionIds => streamSessions({ sessionIds })
  .map((session) => {
    const { name: sessionName, location: { name: locationName } } = session;
    return streamSignInReportData(session)
      .through(csvStringify({ columns: signInReportColumns, header: true }))
      .collect()
      .filter(data => data.length > 0)
      .map(data => data.join(''))
      .map(content => ({
        filename: `sign-in-${sessionName}-${locationName}.csv`,
        content,
      }));
  })
  .mergeWithLimit(10);


// registration { personId, tuitionId }
// tuition {name: tuitionName }
// person { firstName, lastName }

