Accounts.emailTemplates.siteName = Meteor.settings.private.emails.welcome.siteName;
Accounts.emailTemplates.from = Meteor.settings.private.emails.welcome.from;
Accounts.emailTemplates.enrollAccount.subject = function (/*user*/) {
  return Meteor.settings.private.emails.welcome.subject;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  return Meteor.settings.private.emails.welcome.text + '\n\n' + url;
};