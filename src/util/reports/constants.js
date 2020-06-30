const appToken = process.env.APPTOKEN;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const applicationName = process.env.APPLICATION_NAME;
const mailerEmail = process.env.MAILER_EMAIL;
const mailerPass = process.env.MAILER_PASS;

const SOURCE_DIR = 'SOURCE';
const OUTPUT_DIR = 'OUTPUT';

const baseBody = {
  appToken,
};

const baseRequest = {
  userName,
  password,
  applicationName,
};
// base changed by Pankaj as "https://3jdnj4lom0.execute-api.us-east-1.amazonaws.com/production" is not working
// https://awapi.active.com/rest
const endPoints = {
  base: 'https://cors-anywhere.herokuapp.com/https://awapi.active.com/rest',
  fairfaxData: 'https://cors-anywhere.herokuapp.com/https://fairfax.usedirect.com/FairfaxFCPAWeb/ACTIVITIES/Search.aspx?category_name=CAMPS&search_text=adventure+links&place_id=ALL+PLACES',
  product: {
    season: 'season',
    session: 'session',
    tuition: 'tuition',
    sessionOption: 'sessionOption',
  },
  registration: {
    info: 'registration',
  },
  payment: {
    info: '',
    allocation: '',
  },
  person: {
    basic: 'camps-person-basic-info',
    detail: 'person',
    answer: 'answer',
    family: 'family',
  },
  group: {
    assignment: '',
    participant: '',
    info: '',
  },
  merchandise: {
    detail: '',
    purchase: '',
  },
};

module.exports = {
  SOURCE_DIR,
  OUTPUT_DIR,
  endPoints,
  baseBody,
  baseRequest,
  mailerEmail,
  mailerPass,
};
