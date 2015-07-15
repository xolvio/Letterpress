Template.disqusThread.onRendered(function() {
  /* * * CONFIGURATION VARIABLES * * */
// Required: on line below, replace text in quotes with your forum shortname
  var disqus_shortname = Meteor.settings.public.disqus;

  /* * * DON'T EDIT BELOW THIS LINE * * */
  (function () {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
});