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
 *
 * BONUS:
 *
 * Rewrite your solution.  This time instead of selecting each flag
 * individually, write a function that recursively walks the DOM tree
 * and moves the flags as they are found.  Don't forget to sort the
 * flags so they are in the correct order in the bucket.
 */
(function() { // Keep this line.

  var Bucket = function(document, selector) {
    this.document = document;
    this.element  = document.querySelector(selector);
  };

  // Insert the given node into the bucket.
  Bucket.prototype.insert = function(node) {
    this.element.appendChild(this.wrap(node));
  };

  // Ensure the given node is wrapped in an <LI>.
  Bucket.prototype.wrap = function(node) {
    if (node.tagName === "LI") return node;
    var li = this.document.createElement("LI");
    li.appendChild(node);
    return li;
  };

  // Insert a node given a CSS selector.
  Bucket.prototype.insertFromSelector = function(selector) {
    this.insert(this.document.querySelector(selector));
  };

  var bucket = new Bucket(document, "#bucket ul");

  bucket.insertFromSelector(".main li.foo");     // Flag #1
  bucket.insertFromSelector("#articles a span"); // Flag #2

  var f3Ancestor = document.querySelector(".footer div div");
  bucket.insert(f3Ancestor.lastElementChild.firstElementChild);

  var f4 = document.querySelector("#article-3 p span");
  var f5 = f4.parentNode;
  bucket.insert(f4);
  bucket.insert(f5);
})(); // Keep this line too.
