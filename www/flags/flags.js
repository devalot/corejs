/*
 * Using only the built-in DOM methods, find the elements that have
 * the text "FLAG" inside them and move them (the element) into the
 * div with id of #bucket.
 *
 * Hint: you can use:
 *
 *   - document.getElementById
 *   - document.getElementsByTagName
 *   - document.getElementsByClassName
 *   - document.querySelector
 *   - document.querySlectorAll
 *
 * and all the parent, child and sibling selectors, along with the DOM
 * traversal properties such as:
 *
 *   - parentNode
 *   - previousSibling
 *   - nextSibling
 *   - firstChild
 *   - lastChild
 *   - childNodes
 *
 * Make sure to read the index.html file and study the locations of
 * the FLAG elements.
 */
(function() { // Keep this line.

  var bucket = document.querySelector("#bucket ul");

  // FLAG #1
  var flag1 = document.querySelector(".main li.flag");
  bucket.appendChild(flag1);

  // FLAG #2
  // More complicated looking but more idiomatic:
  bucket.appendChild(document.createElement("li")).
    appendChild(document.querySelector("article a span"));

  // FLAG #3
  // Even crazier, but not uncommon:
  (function(d, b) {
    var flag = d.querySelector(".footer div div").
        childNodes[3].childNodes[1];

    b.appendChild(d.createElement("li")).appendChild(flag);
  })(document, bucket);


  // FLAG #4
  var flag4 = document.querySelector("#article-3 span");
  bucket.appendChild(document.createElement("li")).
    appendChild(flag4);

  // FLAG #5
  var flag5Parent = document.getElementById("article-3");
  var flag5Element = flag5Parent.querySelectorAll("p")[2];

  flag5Parent.removeChild(flag5Element);

  bucket.appendChild(document.createElement("li")).
    textContent = flag5Element.textContent;

})(); // Keep this line.
