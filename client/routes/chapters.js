Router.map(function () {
  this.route('chapter', Inverter.register('routers.chapter', {
    path: '/chapter/:chapterNumber',
    name: 'chapter',
    waitOn: function () {
      return Meteor.subscribe('chapters');
    },
    action: function () {
      if (!Meteor.user()) {
        this.render('chapterPreview');
      } else {
        this.render('chapterPremium');
      }
    },
    data: function () {
      return Chapters.findOne({chapterNumber: this.params.chapterNumber});
    }
  }));
});
