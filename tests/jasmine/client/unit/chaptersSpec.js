describe("The chapters page", function () {

  it("should route logged in users to the premium template", function () {

    // SETUP
    var chapterRouteMap = Inverter.get('routers.chapter');

    // grab hold of what gets passed to the render method
    var _templateToRender = null;
    var routerContextStub = {
      render: function (templateToRender) {
        _templateToRender = templateToRender;
      }
    };

    // force the meteor usser call to be true
    Meteor.user = function () {
      return true;
    };

    // EXECUTE
    // grab the isolated action function
    chapterRouteMap.action.apply(routerContextStub);

    // VERIFY the render method was called with the right template
    expect(_templateToRender).toBe('chapterPremium');


  });

  it("should route non-logged in users to the preview template", function () {

    // SETUP
    var chapterRouteMap = Inverter.get('routers.chapter');

    // grab hold of what gets passed to the render method
    var _templateToRender = null;
    var routerContextStub = {
      render: function (templateToRender) {
        _templateToRender = templateToRender;
      }
    };

    // force the meteor usser call to be true
    Meteor.user = function () {
      return false;
    };

    // EXECUTE
    // grab the isolated action function
    chapterRouteMap.action.apply(routerContextStub);

    // VERIFY the render method was called with the right template
    expect(_templateToRender).toBe('chapterPreview');


  });
});

