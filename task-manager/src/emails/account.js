const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: 'lauta.nahuel94@gmail.com',
    from: 'task@manager.com',
    subject: 'Welcome to the App',
    text: `Welcome ${name}. Let me know how you get along with the app.`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: 'lauta.nahuel94@gmail.com',
    from: 'task@manager.com',
    subject: `Goodbye ${name}`,
    text: 'Let us know if there is something we could have done the keep you in.'
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
