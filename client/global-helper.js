UI.registerHelper('classes', function () {
  var currentPage = Letterpress.Collections.Pages.findOne({path: window.location.pathname});

  if (!currentPage) {
    return '';
  }

  return currentPage.template + ' ' + currentPage.path.substring(1);

});