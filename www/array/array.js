ArrayExercise = function(test) {

  /****************************************************************************/
  // Array Documentation:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

  /****************************************************************************/
  // TEST DATA:
  var users = [
    {id: 1, username: "caiva", age: 30},
    {id: 2, username: "ahxae", age: 17},
    {id: 3, username: "i4tie", age: 42},
    {id: 4, username: "bvu7F", age: 19},
  ];

  /****************************************************************************/
  // EXERCISE 1:
  //
  // The anonymous function below should return an array of users from
  // the TEST DATA above that only includes users under the age of 18.
  test.confirm(function() {

    return users.filter(function(user) {
      return user.age < 18;
    });

  });

  /****************************************************************************/
  // EXERCISE 2:
  //
  // The anonymous function below should return an array of strings.
  // The strings should be all of the usernames from the TEST DATA
  // above, in the same order.
  test.confirm(function() {

    return users.map(function(e) {
      return e.username;
    });

  });

  /****************************************************************************/
  // BONUS EXERCISE:
  //
  // The anonymous function below should return the `users' array from
  // above (TEST DATA) in reverse order.  Do not use the built-in
  // reverse function.
  test.confirm(function() {
    var result = [];

    for (var j=0, i=users.length - 1; i >= 0; --i, ++j) {
      result[j] = users[i];
    }

    return result;
  });
};
