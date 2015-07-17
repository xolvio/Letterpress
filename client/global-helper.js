UI.registerHelper('classes', function () {

  var currentPage = Letterpress.Collections.Pages.findOne({path: Iron.Location.get().path});

  if (!currentPage) {
    return '';
  }

  return currentPage.template + ' ' + currentPage.path.substring(1);

});

UI.registerHelper('subscribed', function () {

  return Session.get('subscribed');

});