$(function() {
  var checks = [

    /**************************************************************************/
    // Exercise 1 (example):
    3,

    /**************************************************************************/
    // Exercise 2:
    function(value, test) {
      test.assertInstanceOf(value, String);
      test.assert(value.length >= 5, "expected least 5 characters");
      return true;
    },

    /**************************************************************************/
    // Exercise 3:
    function (value, test) {
      test.assertInstanceOf(value, Array);
      test.assert(value.length >= 5, "expected least 5 elements");
      return true;
    }
  ];

  new Confirm(function(confirm) {
    Primitives(confirm);
    confirm.assertValues(checks);
  });
});
