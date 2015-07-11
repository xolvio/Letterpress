Template['landing-page'].helpers({
  chapters: function () {
    return Letterpress.Collections.Pages.find({template: 'chapter'}, {sort: {order: 1}});
  }
});
