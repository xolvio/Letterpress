Meteor.startup(function () {
  Chapters.remove({});

  Chapters.insert({
    title: "How to Peel Oranges",
    description: "You will learn the magic techniques of carving oranges.",
    premium: 'This is premium content 1',
    chapterNumber: 1
  });

  Chapters.insert({
    title: "What to do with a Bent Fork",
    description: "Using pure strength and genius, you can fix a bent fork",
    premium: 'This is premium content 2',
    chapterNumber: 2
  });

});
