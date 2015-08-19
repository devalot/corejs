// In the index.html file there are several elements containing the
// text "Click Me".  Those elements are followed by another element
// containing the number zero, which we'll call the "counter".
//
// Inside the anonymous function below, write the necessary code so
// that clicking any "Click Me" element will increment its paired
// counter.
(function() {

  document.querySelector("body").
    addEventListener("click", function(e) {
      if (e.target.nodeType  != 1 ||
          e.target.innerText != "Click Me")
      { return; }

      var counter = e.target.nextSibling;

      while (counter && counter.nodeType != 1) {
        counter = counter.nextSibling;
      }

      if (counter) {
        counter.innerText =
          parseInt(counter.innerText) + 1;
      }

      e.preventDefault();
    });
})();
