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

  var globalCounter = document.createElement("span"),
      h1 = document.createElement("h1");

  globalCounter.innerText = "Global Counter: ";

  h1.appendChild(globalCounter);
  h1.appendChild(document.createElement("span")).innerText = "0";
  body.insertBefore(h1, body.firstChild);

  var update = function(element) {
    var span =
        element.nextElementSibling;

    span.innerText =
      (parseInt(span.innerText) || 0) + 1;
  };

  body.addEventListener("click", function(e) {
    if (e.target.innerText === "Click Me") {
      update(e.target);
      update(globalCounter);
      e.preventDefault(); // Don't follow links!
    }
  });

})();
