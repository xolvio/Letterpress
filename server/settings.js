try {
  check(Meteor.settings, Match.ObjectIncluding({
    public: Match.ObjectIncluding({
      book: Match.ObjectIncluding({
        title: String
      })
    })
  }));

} catch (e) {
  console.error(e.message);
  console.error('Please start meteor with --settings and include all the required fields. See here for more details:');
  console.error('https://github.com/xolvio/Letterpress/blob/master/settings.json');
  process.exit(1);
}