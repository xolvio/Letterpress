Pages = new Mongo.Collection('pages');
Pages.before.insert(function (userId, doc) {
  doc.path = doc.path || doc.title.replace(/ /g, '-').toLowerCase();
  if (doc.path[0] !== '/') {
    doc.path = '/' + doc.path;
  }
});

Meteor.publish("pages", function () {
  return Pages.find();
});