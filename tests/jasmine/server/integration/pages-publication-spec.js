describe("Pages publication", function() {
  beforeEach(function (done) {
    Meteor.call('fixtures/reset', function() {
      Letterpress.Collections.Pages.insert({
        _id: 'myId',
        title: 'My Title with Spaces and Cases',
        content: 'My preview content',
        premiumContent: 'My premium content that you need to login for',
        order: 1,
        path: '/content'
      }, done);
    });
  });

  it('should return regular data but not premiumContent when a user is not logged in', function() {
    //Setup
    var page = Letterpress.Collections.Pages.findOne('myId');
    //Execute
    var cursor = Meteor.server.publish_handlers.pages();
    //Verify
    data = cursor.fetch()[0];
    expect(data.premiumContent).toBeUndefined;
    expect(data.content).toBe(page.content);
    expect(data.title).toBe(page.title);
    expect(data.order).toBe(page.order);
    expect(data.path).toBe(page.path);
  });

  it('should return premiumContent when a user is logged in', function() {
    //Setup
    var page = Letterpress.Collections.Pages.findOne('myId');
    //Execute
    var cursor = Meteor.server.publish_handlers.pages.apply({userId: '123'});
    //Verify
    expect(cursor.fetch()[0].premiumContent).toBe(page.premiumContent);
  });
});
