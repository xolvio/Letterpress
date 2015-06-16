Template['landing-page'].helpers({
  chapters: function () {
    return Pages.find({template: 'chapter'}, {sort: {order: 1}});
  }
});
