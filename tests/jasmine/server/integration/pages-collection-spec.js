describe('Pages collection', function () {

  beforeEach(function (done) {
    Meteor.call('fixtures/reset', done);
  });

  it('should add a slug to chapters with spaces converted to dashes and all lowercase', function () {

    Pages.insert({
      _id: 'myId',
      title: 'My Title with Spaces and Cases'
    });

    expect(Pages.findOne('myId').path).toBe('/my-title-with-spaces-and-cases');

  });

  it('should add a slug to chapters with spaces converted to dashes and all lowercase', function () {

    Pages.insert({
      _id: 'myId',
      path: '/here'
    });

    expect(Pages.findOne('myId').path).toBe('/here');

  });

  it('should add a backslash to the path if one is not provided', function () {

    Pages.insert({
      _id: 'myId',
      path: 'here'
    });

    expect(Pages.findOne('myId').path).toBe('/here');

  });

});