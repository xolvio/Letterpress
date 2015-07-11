Template.body.events({
  // any link with the word "buy" in it will trigger a purchase
  'click a:contains("Buy"), click a:contains("buy"), click a:contains("BUY")': function () {
    Letterpress.Services.BuyService.purchase();
  }
});