/*
 * Read the index.html file and locate all of the elements that have
 * text content containing the word "FLAG" followed by a number ("#1",
 * "#2", etc.)
 *
 * Using the standard DOM methods, move these elements into the `ul'
 * element that is inside the `div' with the ID of `#bucket'.  Move
 * the entire element, not just the text content.  Ensure you maintain
 * proper HTML structure by enclosing the FLAG elements in `li'
 * elements when necessary.
 *
 * The FLAG elements in the `ul' should be listed in ascending
 * (numeric) order.
 *
 * Tips:
 *
 * Move them one at a time.  Some of them will have to be moved by
 * selecting a parent element and then using the traversal methods to
 * find the correct FLAG element.
 *
 * Hint: you can use:
 *
 *   - getElementById
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 *
 *   - getElementsByTagName
 *     https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
 *
 *   - getElementsByClassName
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
 *
 *   - querySelector
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 *   - querySelectorAll
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 *   - createElement
 *     https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 *
 *   - appendChild
 *     https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
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
 * Which you can read about here:
 *
 *    https://developer.mozilla.org/en-US/docs/Web/API/Node
 *
 */
(function() { // Keep this line.

  var bucket = document.getElementById("bucket");
  var list   = bucket.querySelector("ul");

  // Wrap an element in a <li> and add it to the bucket.
  var wrapAndAdd = function(element) {
    if (element.tagName !== "LI") {
      var temp = document.createElement("li");
      temp.appendChild(element);
      element = temp;
    }

    list.appendChild(element);
  };

  var walk = function(element) {
    if (element.nodeType === 1) {
      Array.prototype.slice.call(element.childNodes).
        forEach(walk);
    } else if (element.nodeType === 3 &&
               element.textContent.match(/^FLAG/))
    {
      wrapAndAdd(element.parentNode);
    }
  };

  walk(document.querySelector(".main"));

  // var flag1 = document.querySelector(".main li.foo");
  // wrapAndAdd(flag1);
  //
  // var flag2 = document.querySelector(".new a span");
  // wrapAndAdd(flag2);
  //
  // // Pure CSS: .footer div div :nth-child(2) :nth-child(1)
  // var flag3 = document.querySelector(".footer div").
  //     childNodes[1].childNodes[3].childNodes[1];
  // wrapAndAdd(flag3);
  //
  // var flag4 = document.querySelector("#article-3 span");
  // var flag5 = flag4.parentNode;
  //
  // wrapAndAdd(flag4);
  // wrapAndAdd(flag5);

})(); // Keep this line too.
