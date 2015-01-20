Meteor.startup(function () {
  Chapters.remove({});

  Chapters.insert({
    title: "How to Peel Oranges",
    description: "You will learn the magic techniques of carving oranges.",
    chapterNumber: 1
  });

  Chapters.insert({
    title: "What to do with a Bent Fork",
    description: "Using pure strength and genius, you can fix a bent fork",
    chapterNumber: 2
  });

});
