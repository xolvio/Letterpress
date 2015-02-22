Meteor.publish('chapters', function () {

  if (this.userId) {
    return Chapters.find();
  } else {
    return Chapters.find({}, {fields: {premium: 0}});
  }

});