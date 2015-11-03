/*
 * Fill in the `copy' function so that it duplicates the object it is
 * passed as its first argument.  It should return the duplicate.
 *
 * Ensure that the duplicated object only contains properties that are
 * present on the incoming object, and not those that it inherits.
 * (In other words, use the `hasOwnProperty' method.)
 *
 */
copy = function(object) {
  var dup = {}; // New, empty object.

  for (var p in object) {
    if (object.hasOwnProperty(p)) {
      dup[p] = object[p];
    }
  }

  return dup;
};
