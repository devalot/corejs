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

  var globalCounter = document.createElement("h1");

  globalCounter.appendChild(document.createElement("span")).
    textContent = "Global Counter: ";

  globalCounter.appendChild(document.createElement("span")).
    textContent = "0";

  var increment = function(element) {
    var span = element.nextElementSibling;
    var num  = parseInt(span.textContent);
    span.textContent = (num + 1).toString();
  };

  var body = document.querySelector("body"),
      div  = document.getElementById("container");

  body.insertBefore(globalCounter, div);

  body.addEventListener("click", function(event) {
    if (event.target.textContent === "Click Me") {
      increment(event.target);
      increment(globalCounter.children[0]);
      event.preventDefault();
    }
  });
})();
