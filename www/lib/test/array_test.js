$(function() {

  var checks = [
    // EXERCISE 1:
    function(value, test) {
      test.assertInstanceOf(value, Function);

      var users = value();
      console.log("exercise 1 function returned: ", users);

      test.assertInstanceOf(users, Array);
      test.assert(users.length === 1, "returned array should have length of one");
      test.assert(users[0].age === 17, "returned users should be under 18");

      return true;
    },

    // EXERCISE 2:
    function(value, test) {
      test.assertInstanceOf(value, Function);

      var names = value();
      console.log("exercise 2 function returned: ", names);

      test.assertInstanceOf(names, Array);
      test.assert(names.length === 4, "should have 4 usernames");

      test.assert(names[0] === "caiva" &&
                  names[1] === "ahxae" &&
                  names[2] === "i4tie" &&
                  names[3] === "bvu7F", "usernames should be in correct order");

      return true;
    },

    // EXERCISE 3: (BONUS)
    function(value, test) {
      test.assertInstanceOf(value, Function);

      var users = value();

      if (users === undefined) {
        // Bonus not solved.
        return null;
      }

      test.assertInstanceOf(users, Array);
      test.assert(users.length === 4, "array should contain 4 elements");

      test.assert(users[0].id === 4 &&
                  users[1].id === 3 &&
                  users[2].id === 2 &&
                  users[3].id === 1, "elements should have been reversed");

      return true;
    },
  ];

  new Confirm(function(confirm) {
    ArrayExercise(confirm);
    confirm.assertValues(checks);
  });
});
