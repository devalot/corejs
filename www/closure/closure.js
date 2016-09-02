/****************************************************************************/
// EXERCISE 1:
//
// The function below should return an object with two
// properties:
//
//   setTemp: A function that takes a single argument and sets the
//            current temperature to the value of the argument.
//
//   getTemp: A function that returns the last temperature set by
//            the setTemp function.
//
ClosureExercise = function() {
  var temp;

 return {
   setTemp: function(x) {
     if (x > 0 && x < 100) {
       temp = x;
     }
   },

   getTemp: function() {
     return temp || 100;
   },
 };
};
