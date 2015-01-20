Router.map(function() {
  this.route('landingPage', {path: '/'});
  this.route('chapter', {
    path: '/chapter/:chapterNumber',
    name: 'chapter',
    action: function() {
      if (!Meteor.user()) {
        this.render('chapterPreview');
      }
    }
    // data: function() {
    //   return Chapters.findOne({chapterNumber: this.params.chapterNumber})
    // }
  });
});
