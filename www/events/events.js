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

  // See if a counter can be found in `node'.
  Counter.find = function(node) {
    if (node.textContent === "Click Me") {
      return new Counter(node.nextElementSibling);
    } else {
      return null;
    }
  };

  // Create and return a "global" counter.
  Counter.global = function(document) {
    var h1 = document.createElement("H1");
    var label = document.createElement("SPAN");
    var number = document.createElement("SPAN");

    label.textContent = "Global Counter: ";
    number.textContent = "0";
    h1.appendChild(label);
    h1.appendChild(number);
    document.body.insertBefore(h1, document.body.firstChild);

    return new Counter(number);
  };

  // Return the current value of the counter.
  Counter.prototype.value = function() {
    return parseInt(this.element.textContent) || 0;
  };

  // Increment the value of the counter.
  Counter.prototype.increment = function() {
    this.element.textContent = this.value() + 1;
  };

  // Increment and check goal status.
  Counter.prototype.incrementAndCheckGoal = function() {
    this.increment();
    if (this.value() > 10) this.element.classList.add("goal");
  };

  var global = Counter.global(document);

  document.body.addEventListener("click", function(event) {
    var counter = Counter.find(event.target);
    if (!counter) return;

    counter.increment();
    global.incrementAndCheckGoal();
    event.preventDefault();
  });

})();
