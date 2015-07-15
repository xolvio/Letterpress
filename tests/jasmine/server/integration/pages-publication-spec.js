describe("Pages publication", function() {
  beforeEach(function (done) {
    Meteor.call('fixtures/reset', done);
  });

  it('should not return premiumContent when a user is not logged in', function() {
    //Setup
    Letterpress.Collections.Pages.insert({
      _id: 'myId',
      title: 'My Title with Spaces and Cases',
      content: 'My preview content',
      premiumContent: 'My premium content that you need to login for'
    });
    //Execute
    var cursor = Meteor.server.publish_handlers["pages"]();
    //Verify
    expect(cursor.fetch()[0].premiumContent).toBeUndefined;
  });

  it('should return premiumContent when a user is logged in', function() {
    //Setup
    Letterpress.Collections.Pages.insert({
      _id: 'myId',
      title: 'My Title with Spaces and Cases',
      content: 'My preview content',
      premiumContent: 'My premium content that you need to login for'
    });
    //Execute
    var cursor = Meteor.server.publish_handlers.pages.apply({userId: '123'});
    //Verify
    expect(cursor.fetch()[0].premiumContent).toBe('My premium content that you need to login for');
  });
});
