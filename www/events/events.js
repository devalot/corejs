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
    var h2 = document.createElement("h2");
    var title = document.createElement("span");
    var counter = document.createElement("span");

    title.textContent = "Global Counter: ";
    counter.textContent = "0";
    h2.appendChild(title);
    h2.appendChild(counter);

    document.body.insertBefore(h2, document.body.firstChild);
    return new Counter(counter);
  };

  // Return the current counter value.
  Counter.prototype.value = function() {
    return parseInt(this.element.textContent) || 0;
  };

  // Increment the counter value.
  Counter.prototype.inc = function() {
    this.element.textContent = this.value() + 1;
  };

  var global = Counter.global(document);

  document.body.addEventListener("click", function(e) {
    if (event.target.textContent !== "Click Me") return;
    event.preventDefault();

    var counter = new Counter(event.target.nextElementSibling);
    counter.inc();
    global.inc();
  });
})();
