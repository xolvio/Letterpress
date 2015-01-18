UI.registerHelper('bookTitle', function () {
  return Meteor.settings.public.book.title;
});

Template.header.helpers({
  'imageSrc': Meteor.settings.public.book.header.imageSrc,
  'imageCaption': function () {
    return Meteor.settings.public.book.header.imageCaption;
  }
});