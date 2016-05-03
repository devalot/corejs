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

  var Counters = function() {
    var global = document.createElement("h1");
    global.appendChild(document.createElement("span")).textContent = "Global: ";

    this.global = global.appendChild(document.createElement("span"));
    this.global.textContent = "0";

    var body = document.querySelector("body");
    body.insertBefore(global, body.firstChild);
  };

  Counters.prototype = {
    inc: function(node) {
      var n = (parseInt(node.textContent) || 0) + 1;
      node.textContent = n.toString();
      return n;
    },

    incGlobal: function() {
      var count = this.inc(this.global);
      if (count > 10) this.global.classList.add("goal");
    },

    findCounter: function(element) {
      do {
        element = element.nextSibling;
      } while (element && element.tagName !== "SPAN");
      return element;
    },

    click: function(event) {
      var counter = this.findCounter(event.target);
      if (!counter) return;
      this.inc(counter);
      this.incGlobal();
      event.preventDefault();
    },
  };

  var counters = new Counters();
  var body = document.querySelector("body");

  // body.addEventListener("click", counters.click.bind(counters));

  body.addEventListener("click", function(event) {
    counters.click(event);
  });

})();
