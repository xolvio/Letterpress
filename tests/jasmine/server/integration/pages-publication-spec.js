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
    expect(cursor.fetch().premiumContent).toBeUndefined;
  });

  xit('should return premiumContent when a user is logged in', function() {
    //Setup
    Letterpress.Collections.Pages.insert({
      _id: 'myId',
      title: 'My Title with Spaces and Cases',
      content: 'My preview content',
      premiumContent: 'My premium content that you need to login for'
    });
    //Execute
    var cursor = Meteor.server.publish_handlers.pages();
    console.log(Meteor.server.sessions);
    //Verify
    expect(cursor.fetch().premiumContent).toBe('My premium content that you need to login for');
  });
});
