Accounts.emailTemplates.siteName = "AwesomeSite";
Accounts.emailTemplates.from = Meteor.settings.private.emails.from;
Accounts.emailTemplates.enrollAccount.subject = function (/*user*/) {
  return Meteor.settings.private.emails.subject;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  return Meteor.settings.private.emails.text + '\n\n' + url;
};