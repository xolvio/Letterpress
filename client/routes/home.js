Router.map(function() {
  this.route('landingPage', {path: '/'});
  this.route('chapter', {
    path: '/chapter/:id',
    action: function() {
      if (Meteor.user()) {
        this.render('chapter');
      } else {
        this.render('chapterPreview');
      }
    },
    data: function() {
      return Chapters.findOne({chapterNumber: this.params.id})
    }
  });
});
