Letterpress.Utils.disqusLoader = function () {
  var disqus_shortname = Meteor.settings.public.disqus;
  if (disqus_shortname) {
    (function () {
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }
};

Template.disqusThread.onRendered(function () {
  Letterpress.Utils.disqusLoader();
});