describe('The router', function () {

  it('should render the template defined as type in the current page', function (done) {

    spyOn(Letterpress.Collections.Pages, 'findOne').and.returnValue({template: 'some-template'});

    Router._isolator._routes['/(.*)'].action.apply({
      render: function (template) {
        expect(template).toBe('some-template');
        done();
      }
    });

  });

  it('should render 404 when the page is not found for the route', function (done) {

    spyOn(Letterpress.Collections.Pages, 'findOne').and.returnValue(null);

    Router._isolator._routes['/(.*)'].action.apply({
      render: function (template) {
        expect(template).toBe('404'); // WTF? ASK SANJO
        done();
      }
    });

  });

});