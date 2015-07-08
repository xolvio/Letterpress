describe('Global helpers', function () {

  describe('classes helper', function () {

    it('should return the template and path of a page without the forward slash', function () {

      spyOn(Pages, 'findOne').and.returnValue({
        _id: 'someId',
        template: 'the-template',
        path: '/some-page'
      });

      var classes = UI._globalHelpers['classes']();

      expect(Pages.findOne).toHaveBeenCalledWith({path: window.location.pathname});
      expect(classes).toBe('the-template some-page');

    });

    it('should return an empty string if no page is found', function () {

      spyOn(Pages, 'findOne').and.returnValue(null);

      var classes = UI._globalHelpers['classes']();

      expect(classes).toBe('');

    });

  });

});