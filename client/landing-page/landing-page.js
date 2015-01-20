UI.registerHelper('bookTitle', function () {
  return Meteor.settings.public.book.title;
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - Landing page Chapters header

Template.header.helpers({
  'imageSrc': Meteor.settings.public.book.header.imageSrc,
  'imageCaption': function () {
    return Meteor.settings.public.book.header.imageCaption;
  }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - Landing page Chapters Preview

Template.chaptersPreview.helpers({
  'chapters': function() {
    return Chapters.find({}, {sort: {chapterNumber: 1}});
  }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - Landing page Newsletter

Template.newsletter.events({
  'click button#submitNewsletterEmail': function () {
    Meteor.call('newsletterSignup', $('input#newsletterEmail').val());
  }
});