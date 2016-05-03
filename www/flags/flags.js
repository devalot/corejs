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

  var Bucket = function() {
    this.bucket = document.querySelector("#bucket ul");
  };

  Bucket.prototype.wrap = function(element) {
    if (element.tagName === "LI") return element;
    var wrapper = document.createElement("li");
    wrapper.appendChild(element);
    return wrapper;
  };

  Bucket.prototype.insert = function(element) {
    if (element === null) throw "you have a busted selector";
    this.bucket.appendChild(this.wrap(element));
  };

  Bucket.prototype.findManually = function() {
    var flag1 = document.querySelector(".main li.foo");
    this.insert(flag1);

    var flag2 = document.querySelector("#articles .new a span");
    this.insert(flag2);

    var flag3 = document.querySelector(".footer div div");
    this.insert(flag3.childNodes[3].childNodes[1]);

    var flag4 = document.querySelector("#article-3 p span");
    var flag5 = flag4.parentNode;
    this.insert(flag4);
    this.insert(flag5);
  };

  Bucket.prototype.findAutomatically = function() {
    var self    = this,
        matches = [];

    var find = function(node) {
      if (node.nodeType === 3 && node.nodeValue.match(/FLAG/)) {
        if (!node.nodeValue.match(/NOT/)) matches.push(node);
      } else if (node.nodeType === 1) {
        for (var i=0; i!=node.childNodes.length; ++i) {
          if (node.childNodes[i]) find(node.childNodes[i]);
        }
      }
    };

    find(document.getElementById("container"));

    matches.sort(function(a, b) {
      return a.nodeValue > b.nodeValue;
    }).forEach(function(node) {
      self.insert(node.parentNode);
    });
  };

  var bucket = new Bucket();
  // bucket.findAutomatically();
  // bucket.findManually();

})(); // Keep this line too.
