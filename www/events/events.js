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

// Create a global counter.
Counter.global = function() {
  var h1 = document.createElement("H1");
  var label = document.createElement("span");
  var counter = document.createElement("span");

  label.textContent = "Global: ";
  counter.textContent = "0";
  h1.appendChild(label);
  h1.appendChild(counter);
  document.body.insertBefore(h1, document.body.firstChild);

  return new Counter(counter);
};

// Create a new counter from the given element's sibling.
Counter.fromSibling = function(element) {
  return new Counter(element.nextElementSibling);
};

// Increments the counter.
Counter.prototype.increment = function() {
  this.element.textContent = this.value() + 1;
};

// Returns the current counter value.
Counter.prototype.value = function() {
  return parseInt(this.element.textContent) || 0;
};

var global = Counter.global();

document.body.addEventListener("click", function(e) {
  if (e.target.textContent !== "Click Me") return;

  e.preventDefault();

  var counter = Counter.fromSibling(e.target);
  counter.increment();
  global.increment();

  if (global.value() > 10) {
    global.element.classList.add("goal");
  }
});

})();
