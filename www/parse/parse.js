/******************************************************************************/
// EXERCISE:
//
// The `Parse' function below will be called multiple times with a
// varying number of arguments.  The function should return the number
// of arguments that could successfully be parsed as integers.
Parse = function() {
  var i;
  var successfulCount = 0;

  for (i=0; i<arguments.length; ++i) {
    var parsed = parseInt(arguments[i]);

    if (!isNaN(parsed)) {
      successfulCount += 1;
    }
  }

  return successfulCount;
};
