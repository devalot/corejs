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
  var Bucket = function(selector) {
    this.element = document.querySelector(selector);
  };

  // Wrap a node in a <LI> if necessary.
  Bucket.prototype.wrap = function(node) {
    if (node.tagName === "LI") return node;
    var wrapper = document.createElement("LI");
    wrapper.appendChild(node);
    return wrapper;
  };

  // Insert the given node into the bucket.
  Bucket.prototype.insert = function(node) {
    var wrapped = this.wrap(node);
    this.element.appendChild(wrapped);
  };

  var bucket = new Bucket("#bucket ul");

  var flag1 = document.querySelector("ul li.foo");
  bucket.insert(flag1);

  var flag2 = document.getElementById("articles");
  bucket.insert(flag2.querySelector("span"));

  var footer = document.querySelector(".footer");
  var flag3 = footer.children[0].children[0].
                children[1].children[0];

  // OR: "#articles > div > div > div > div:nth-child(2) > div:nth-child(1)"
  bucket.insert(flag3);

  var flag4 = document.querySelector("#article-3 span");
  var flag5 = flag4.parentNode;
  bucket.insert(flag4);
  bucket.insert(flag5);
})(); // Keep this line too.
