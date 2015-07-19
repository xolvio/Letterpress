Template.videoChapter.created = function () {

  var self = this;

  self.videoLocation = new ReactiveVar();

  if (!self.data.premiumVideo) {
    self.videoLocation.set(self.data.previewVideo);
    return;
  }

  Meteor.call('getSignedUrl', self.data.premiumVideo, function (err, url) {
    if (err) {
      console.error(err);
    } else {
      self.videoLocation.set(url);
    }
  });

};

Template.videoChapter.helpers({
  videoUrl: function () {

    // we need this to run after the next tick
    setTimeout(function() {
      $('video')[0].load();
    }, 0);

    return Template.instance().videoLocation.get();
  }
});