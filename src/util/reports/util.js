// const csvStringify = require('csv-stringify');
const hl = require('highland');
// const request = require('request-promise');
// const nodemailer = require('nodemailer');
const { mailerEmail, mailerPass } = require('./constants');

// const generateCsv = (stream, columns) => stream
//   .through(csvStringify({ columns, header: true }));


const createUrl = (url, endPoint) => `${url}/${endPoint}`;

const parseBuffer = stream => stream
  .collect()
  .map(buffers => buffers.join(''))
  .map(res => JSON.parse(res));

const streamData = (body, endPoint) => hl(fetch(`/${endPoint}`, {
  method: 'POST',
  body: JSON.stringify(body),
}))
  .flatMap(response => hl(response.json()))
  .pluck('data')
  .flatten();

// const sendEmail = (stream, subject) => stream
//   .collect()
//   .flatMap((attachments) => {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: mailerEmail,
//         pass: mailerPass,
//       },
//     });

//     const mailOptions = {
//       from: mailerEmail,
//       to: [
//         mailerEmail,
//         'developer@adventurelinks.net',
//         'elliottabirch@gmail.com',
//       ],
//       subject: `${subject}-${new Date()}`,
//       attachments,
//     };
//     return hl((push) => {
//       transporter.sendMail(mailOptions,
//         (error, info) => {
//           push(error, info);
//           push(null, hl.nil);
//         });
//     });
//   });


module.exports = {
  // generateCsv,
  // sendEmail,
  createUrl,
  parseBuffer,
  streamData,
};

