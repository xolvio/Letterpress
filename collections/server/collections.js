Letterpress.Collections.Pages = new Mongo.Collection('pages');
Letterpress.Collections.Pages.before.insert(function (userId, doc) {
  doc.path = doc.path || doc.title.replace(/ /g, '-').toLowerCase();
  if (doc.path[0] !== '/') {
    doc.path = '/' + doc.path;
  }
});

Meteor.publish("pages", function () {
  var fields = {title: 1, path: 1, template: 1, content: 1};
  if (this.userId)
    fields.premiumContent = 1;
  return Letterpress.Collections.Pages.find({}, {fields: fields});
});


Letterpress.Collections.Audit = new Mongo.Collection('audit');
