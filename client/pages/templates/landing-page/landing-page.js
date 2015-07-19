Template['landing-page'].helpers({
  chapters: function () {
    return Letterpress.Collections.Pages.find({
      $or : [{template: 'chapter'},{template: 'video-chapter'}]
    }, {
      sort: {order: 1}
    });
  }
});
