describe('The router', function () {

  it('should render the template defined as type in the current page', function (done) {

    // - - SETUP
    spyOn(Letterpress.Collections.Pages, 'findOne').and.returnValue({template: 'some-template'});

    // - - EXECUTE
    Router._isolator._routes['/(.*)'].action.apply({
      render: function (template) {
        // - - VERIFY
        expect(template).toBe('some-template');
        done();
      }
    });

  });

  it('should render 404 when the page is not found for the route', function (done) {

    // - - SETUP
    spyOn(Letterpress.Collections.Pages, 'findOne').and.returnValue(null);

    // - - EXECUTE
    Router._isolator._routes['/(.*)'].action.apply({
      render: function (template) {
        // - - VERIFY
        expect(template).toBe('404'); // WTF? ASK SANJO
        done();
      }
    });

  });

});