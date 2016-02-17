ClosureExercise = function(test) {

  /****************************************************************************/
  // EXERCISE 1:
  //
  // The anonymous function below should return an object with two
  // properties:
  //
  //   setTemp: A function that takes a single argument and sets the
  //            current temperature to the value of the argument.
  //
  //   getTemp: A function that returns the last temperature set by
  //            the setTemp function.
  //
  test.confirm(function() {

    var temp = null;

    return {
      setTemp: function(t) { temp = t;    },
      getTemp: function()  { return temp; },
    };

  });

};
