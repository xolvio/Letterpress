describe('Email Service', function () {

  describe('sendConfirmation', function () {

    it('sends an email to the specified user using the preset from, subject and message ', function () {


      Meteor.settings.private.emails.from = 'someone@example.com';
      Meteor.settings.private.emails.myTemplate = {};
      Meteor.settings.private.emails.myTemplate.subject = 'The Subject';
      Meteor.settings.private.emails.myTemplate.text = 'The Message';
      spyOn(Email, 'send');

      Letterpress.Services.EmailService.sendConfirmation('me@example.com', 'myTemplate');

      expect(Email.send).toHaveBeenCalledWith({
        to: 'me@example.com',
        from: Meteor.settings.private.emails.from,
        subject: Meteor.settings.private.emails.myTemplate.subject,
        text: Meteor.settings.private.emails.myTemplate.text
      });

    });

  });

});