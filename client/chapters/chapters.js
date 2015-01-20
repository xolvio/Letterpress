Template.chapters.helpers({
  'chapters': function () {
    return Chapters.find({}, {sort: {chapterNumber: 1}});
  }
});

Template.chapterPremium.helpers({
  'chapter': function () {
    console.log(this);
    return this;
  }
});