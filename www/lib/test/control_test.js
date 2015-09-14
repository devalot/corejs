$(function() {

  var e2And3 = function(value, test) {
    test.assertInstanceOf(value, Function);
    test.assert(value(42)   === true,  "should have returned true when given 42");
    test.assert(value(1)    === false, "should have returned false when given 1");
    test.assert(value("42") === false, "should have returned false when given string \"42\"");
    test.assert(value(43)   === null,  "should have returned null when given 43");
    test.assert(value("43") === false, "should have returned false when given string \"43\"");
    return true;
  };

  var checks = [

    /**************************************************************************/
    // Exercise 1:
    function(value, test) {
      test.assertInstanceOf(value, Function);
      test.assert(value(42)   === true,  "should have returned true when given 42");
      test.assert(value(1)    === false, "should have returned false when given 1");
      test.assert(value("42") === false, "should have returned false when given string \"42\"");
      return true;
    },

    /**************************************************************************/
    // Exercise 2 and 3:
    e2And3,
    e2And3,

    /**************************************************************************/
    // Exercise 4:
    function(value, test) {
      test.assertInstanceOf(value, Function);

      var times = 0;
      var counter = function() {times += 1;};

      value(counter);
      test.assert(times === 3, "the counter function should have been called 3 times");
      return true;
    },

  ];

  new Confirm(function(confirm) {
    ControlFlow(confirm);
    confirm.assertValues(checks);
  });
});
