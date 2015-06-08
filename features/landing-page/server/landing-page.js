Meteor.startup(function () {

  Pages.upsert({path: '/'}, {
    path: '/',
    markdown: '' +
    '![Cover](/cover.jpg "Cover")' +
    '\n\n' +
    '*Write your own book with this WYSIWYG markdown powered book app*' +
    '\n\n' +
    '[Try it](/try "Try It") [Buy It](/buy "Buy It")'
  });

  Pages.upsert({path: '/try'}, {
    path: '/try',
    markdown: '' +
    '#Coming soon' +
    '\n\n' +
    '[Home](/ "Home")'
  });

  Pages.upsert({path: '/buy'}, {
    path: '/buy',
    markdown: '' +
    '#Coming soon' +
    '\n\n' +
    '[Home](/ "Home")'
  });

});