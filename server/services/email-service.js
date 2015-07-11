Letterpress.Services.EmailService = {};

Letterpress.Services.EmailService.sendConfirmation = function (to, template) {
  Email.send({
    to: to,
    from: Meteor.settings.private.emails.from,
    subject: Meteor.settings.private.emails[template].subject,
    text: Meteor.settings.private.emails[template].text
  });
};