/******************************************************************************/
// EXERCISE:
//
// The `Parse' function below will be called multiple times with a
// varying number of arguments.  The function should return the number
// of arguments that could successfully be parsed as integers.
Parse = function() {
  var validNumbers = 0;
  var i, parsed;

  for (i=0; i != arguments.length; ++i) {
    parsed = parseInt(arguments[i]);

    if (isFinite(parsed)) {
      validNumbers += 1;
    }


  return validNumbers;
};
