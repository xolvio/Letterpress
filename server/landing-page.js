Meteor.methods({
  'newsletterSignup': function (email) {
    check([email], [String]);

    this.unblock();

    newsletterSignups.upsert({email: email}, {email: email});

    Email.send({
      to: email,
      from: 'letterpress@xolv.io',
      subject: 'Welcome to the mailing list',
      text: 'You are confirmed.'
    });
  }
});