$(function() {
  var checks = [

    /**************************************************************************/
    // Exercise 1 (example):
    3,

    /**************************************************************************/
    // Exercise 2:
    function(value, test, name) {
      if (typeof value !== "string") {
        test.record(false, name + ": expected value to be a string");
        return false;
      }

      if (value.length < 5) {
        test.record(false, name + ": expected string to be at least 5 characters");
        return false;
      }

      return true;
    },
  ];

  var confirm = new Confirm();
  var primitives = Primitives(confirm);
  confirm.assert_values(checks);
});
