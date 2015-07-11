Letterpress.Collections.Pages = new Mongo.Collection('pages');
Letterpress.Collections.Pages.before.insert(function (userId, doc) {
  doc.path = doc.path || doc.title.replace(/ /g, '-').toLowerCase();
  if (doc.path[0] !== '/') {
    doc.path = '/' + doc.path;
  }
});

Meteor.publish("pages", function () {
  return Letterpress.Collections.Pages.find();
});