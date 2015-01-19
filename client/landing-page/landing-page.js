UI.registerHelper('bookTitle', function () {
  return Meteor.settings.public.book.title;
});

Template.header.helpers({
  'imageSrc': Meteor.settings.public.book.header.imageSrc,
  'imageCaption': function () {
    return Meteor.settings.public.book.header.imageCaption;
  }
});

Template.newsletter.events({
  'click button#submitNewsletterEmail': function () {
    Meteor.call('newsletterSignup', $('input#newsletterEmail').val());
  }
});

Template.chapters.helpers({
  'chapters': function() {
    return Chapters.find({}, {sort: {chapterNumber: 1}});
  }
});
