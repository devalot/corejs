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

  var update = function(element) {
    var counter = element.nextElementSibling;
    var n = parseInt(counter.textContent) || 0;
    counter.textContent = (n + 1).toString();
  };

  var global = document.createElement("div");
  global.appendChild(document.createElement("h1")).
    textContent = "Global Counter";
  global.appendChild(document.createElement("span")).
    textContent = "0";

  var container = document.querySelector("body");
  container.insertBefore(global, container.childNodes[0]);

  container.addEventListener("click", function(event) {
    var element = event.target;

    if (element.textContent === "Click Me") {
      update(element);
      update(global.childNodes[0]);
      event.preventDefault();
    }
  });

})();
