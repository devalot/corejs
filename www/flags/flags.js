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

  // Cache the <UL> in the bucket:
  var bucket = document.querySelector("#bucket ul");

  // Function to move a node into the bucket:
  var move = function(e) {
    if (e.tagName === "LI") {
      bucket.appendChild(e);
    } else {
      var li = document.createElement("li");
      li.appendChild(e);
      bucket.appendChild(li);
    }
  };

  // FLAG #1:
  var flag1 = document.querySelector(".main ul li.foo");
  move(flag1);

  // FLAG #2:
  var flag2 = document.querySelector("#articles a span");
  move(flag2);

  // FLAG #3:
  var flag3Parent = document.querySelector(".footer div");
  var flag3 = flag3Parent.childNodes[1].childNodes[3].childNodes[1];
  move(flag3);

  // FLAG #4 and #5:
  var flag4 = document.querySelector("#article-3 span");
  var flag5 = flag4.parentNode;
  move(flag4);
  move(flag5);

})(); // Keep this line too.
