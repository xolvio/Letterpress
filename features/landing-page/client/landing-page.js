Template.landingPage.helpers({

  // templateName = Template.instance().view.name.replace('Template.', '');

  page: function () {
    return Pages.findOne({path: window.location.pathname});
  }

});