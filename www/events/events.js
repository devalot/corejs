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

  var Counter = function(element) {
    this.element = element;
  };

  Counter.global = function(document) {
    var h1 = document.createElement("h1");
    var label = document.createElement("span");
    var counter = document.createElement("span");

    label.textContent = "Global Counter: ";
    counter.textContent = "0";
    h1.appendChild(label);
    h1.appendChild(counter);

    var body = document.querySelector("body");
    body.insertBefore(h1, body.firstChild);

    return new Counter(counter);
  };

  Counter.fromEvent = function(event) {
    var sibling = event.target;
    return new Counter(sibling.nextElementSibling);
  };

  Counter.prototype.value = function() {
    return parseInt(this.element.textContent) || 0;
  };

  Counter.prototype.increment = function() {
    this.element.textContent = this.value() + 1;
  };

  var body = document.querySelector("body");
  var global = Counter.global(document);

  body.addEventListener("click", function(event) {
    if (event.target.textContent !== "Click Me") return;
    event.preventDefault();

    Counter.fromEvent(event).increment();
    global.increment();

    if (global.value() > 10) {
      global.element.classList.add("goal");
    }
  });

})();
