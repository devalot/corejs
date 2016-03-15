// In the index.html file there are several elements containing the
// text "Click Me".  Those elements are followed by another element
// containing the number zero, which we'll call the "counter".
//
// Inside the anonymous function below, write the necessary code so
// that clicking any "Click Me" element will increment its paired
// counter.
//
// BONUS 1: Create a new element on the page that displays the sum of
// all other counters.
//
// BONUS 2: When the global counter goes above 10 add the "goal" class
// to it.  Doing so should make it turn red.
(function() {

  var body = document.querySelector("body");

  var parent = document.createElement("h1");
  var globalText = document.createElement("span");
  var globalCounter = document.createElement("span");

  globalText.textContent = "Global Counter: ";
  globalCounter.textContent = "0";

  parent.appendChild(globalText);
  parent.appendChild(globalCounter);

  body.insertBefore(parent, body.firstChild);

  var inc = function(element) {
    var counter = element.nextSibling;

    while (counter.nodeType !== 1) {
      counter = counter.nextSibling;
    }

    var newValue = parseInt(counter.textContent) + 1;
    counter.textContent = newValue;

    if (newValue >= 10) {
      counter.classList.add("goal");
    }
  };

  body.addEventListener("click", function(event) {
    if (event.target.textContent === "Click Me") {
      inc(event.target);
      inc(globalText);
      event.preventDefault();
    }
  });

})();
