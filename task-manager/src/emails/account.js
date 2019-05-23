const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'lauta.nahuel94@gmail.com',
    subject: 'Welcome to the App',
    text: `Welcome ${name}. Let me know how you get along with the app.`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'lauta.nahuel94@gmail.com',
    subject: `Goodbye ${name}`,
    text: 'Let us know if there is something we could have done the keep you in.'
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
