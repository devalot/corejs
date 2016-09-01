/******************************************************************************/
// EXERCISE:
//
// The `Parse' function below will be called multiple times with a
// varying number of arguments.  The function should return the number
// of arguments that could successfully be parsed as integers.
Parse = function() {
  var count = 0;

  for (var i=0; i < arguments.length; ++i) {
    var parsed = parseInt(arguments[i]);
    if (isFinite(parsed)) ++count;
  }

  return count;
};
