describe("Pages publication", function () {

  beforeEach(function (done) {
    Meteor.call('fixtures/reset', function () {
      Letterpress.Collections.Pages.insert({
        _id: 'myId',
        title: 'My Title with Spaces and Cases',
        description: 'My description',
        path: '/content',
        order: 1,
        previewVideo: 'http://cdn.com/a/preview.mp4',
        premiumVideo: 'http://cdn.com/a/video.mp4',
        premiumContent: 'My premium content that you need to login for'
      }, done);
    });
  });

  it('should return regular data but not premiumContent when a user is not logged in', function () {

    // SETUP
    var page = Letterpress.Collections.Pages.findOne('myId');

    // EXECUTE
    var cursor = Meteor.server.publish_handlers.pages();

    // VERIFY
    data = cursor.fetch()[0];
    expect(data.premiumContent).toBeUndefined();
    expect(data.premiumVideo).toBeUndefined();
    expect(data.previewVideo).toBe(page.previewVideo);
    expect(data.description).toBe(page.description);
    expect(data.title).toBe(page.title);
    expect(data.order).toBe(page.order);
    expect(data.path).toBe(page.path);

  });

  it('should return premiumContent when a user is logged in', function () {

    // SETUP
    var page = Letterpress.Collections.Pages.findOne('myId');
    spyOn(Meteor.users, 'findOne').and.returnValue({
      profile: {
        periodEnd: Math.floor(new Date().getTime() / 1000)
      }
    });

    // EXECUTE
    var cursor = Meteor.server.publish_handlers.pages.apply({userId: '123'});

    // VERIFY
    expect(cursor.fetch()[0].premiumContent).toBe(page.premiumContent);
    expect(cursor.fetch()[0].video).toBe(page.video);
  });


  it('should not return premiumContent when a user is logged in but has an expired subscription', function () {

    // SETUP
    var page = Letterpress.Collections.Pages.findOne('myId');
    spyOn(Meteor.users, 'findOne').and.returnValue({
      profile: {
        periodEnd: Math.floor(new Date().getTime() / 1000) - (365 * 24 * 60 * 60)
      }
    });

    // EXECUTE
    var cursor = Meteor.server.publish_handlers.pages.apply({userId: '123'});

    // VERIFY
    data = cursor.fetch()[0];
    expect(data.premiumContent).toBeUndefined();
    expect(data.premiumVideo).toBeUndefined();
    expect(data.previewVideo).toBe(page.previewVideo);
    expect(data.description).toBe(page.description);
    expect(data.title).toBe(page.title);
    expect(data.order).toBe(page.order);
    expect(data.path).toBe(page.path);
  });

});
