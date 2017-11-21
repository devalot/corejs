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

  var Counter = function(node) {
    this.node = node;
  };

  Counter.global = function() {
    var h1 = document.createElement("H1");
    var title = document.createElement("SPAN");
    var number = document.createElement("SPAN");

    h1.appendChild(title);
    h1.appendChild(number);
    document.body.insertBefore(h1, document.body.firstChild);

    title.textContent = "Global Counter: ";
    number.textContent = "0";

    return new Counter(number);
  };

  Counter.prototype.value = function() {
    return parseInt(this.node.textContent) || 0;
  };

  Counter.prototype.inc = function() {
    this.node.textContent = this.value() + 1;
  };

  var global = Counter.global();

  document.body.addEventListener("click", function(e) {
    if (e.target.textContent !== "Click Me") return;
    e.preventDefault();

    var counter = new Counter(e.target.nextElementSibling);
    counter.inc();
    global.inc();

    if (global.value() > 10) {
      global.node.classList.add("goal");
    }
  });

})();
