Template.chapters.helpers({
  'chapters': function() {
    return Chapters.find({}, {sort: {chapterNumber: 1}});
  }
});
