// In the index.html file there are several elements containing the
// text "Click Me".  Those elements are followed by another element
// containing the number zero, which we'll call the "counter".
//
// Inside the anonymous function below, write the necessary code so
// that clicking any "Click Me" element will increment its paired
// counter.
//
// BONUS: Create a new element on the page that displays the sum of
// all other counters.
(function() {

  var body = document.querySelector("body");

  // Bonus:
  var globalCounter = document.createElement("span");
  globalCounter.textContent = "0";

  var gcParent = document.createElement("p");
  gcParent.textContent = "Global Counter: ";
  gcParent.appendChild(globalCounter);
  body.insertBefore(gcParent, body.childNodes[0]);

  var updateGlobal = function() {
    globalCounter.textContent =
      parseInt(globalCounter.textContent) + 1;
  };

  // Exercise 1:
  body.addEventListener("click", function(event) {
    if (event.target.textContent !== "Click Me") return;
    var counter = event.target.nextElementSibling;
    counter.textContent = parseInt(counter.textContent) + 1;
    updateGlobal();
    event.preventDefault();
  });


})();
