/*
 * The function below takes a string as input and should:
 *
 *   1) Replace the word "today" with the current date using the
 *      `toDateString' method on date object.
 *
 *   2) Replace the word "pi" with the numeric value of PI, to the 2nd
 *      decimal place
 *
 *   3) Count how many occurrences of the letter X (upper and lower
 *      case) present and append the count to the end of the string
 *      following a space
 *
 * It should then return the modified string.
 *
 */
processString = function(input) {
  var today = (new Date()).toDateString(),
      count = 0;

  var result = input.replace(/\b\w+\b/g, function(word) {
    count += (word.match(/x/gi) || []).length;

    switch (word) {
    case "today":
    case "Today":
      return today;

    case "pi":
    case "PI":
      return "3.14";

    default:
      return word;
    }
  });

  return result + " " + count;
};
