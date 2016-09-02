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
    this.counter = this.element.nextElementSibling;
  };

  Counter.prototype.value = function() {
    // Nasty!!
    // return this.counter.textContent | 0;
    return parseInt(this.counter.textContent) || 0;
  };

  Counter.prototype.inc = function() {
    this.counter.textContent =
      (this.value() + 1).toString();
  };

  var body = document.querySelector("body");

  var bonusElement = document.createElement("h1");
  var bonusLabel   = document.createElement("span");
  var bonusNumber  = document.createElement("span");

  bonusLabel.textContent = "All Clicks: ";
  bonusNumber.textContent = "0";
  bonusElement.appendChild(bonusLabel);
  bonusElement.appendChild(bonusNumber);
  body.insertBefore(bonusElement, body.firstChild);
  bonus = new Counter(bonusLabel);

  body.addEventListener("click", function(event) {
    if (event.target.textContent !== "Click Me") return;

    var counter = new Counter(event.target);
    counter.inc();
    bonus.inc();

    if (bonus.value() > 10) {
      bonus.counter.classList.add("goal");
    }

    event.preventDefault();
  });
})();
