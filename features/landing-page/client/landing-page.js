Template.landingPage.helpers({

  page: function () {
    return Pages.findOne({path: window.location.pathname});
  }

});