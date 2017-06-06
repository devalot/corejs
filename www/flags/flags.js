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

  // Insert a node into the bucket.
  Bucket.prototype.insert = function(node) {
    this.element.appendChild(this.wrap(node));
  };

  // Ensure a node is wrapped in an <LI>.
  Bucket.prototype.wrap = function(node) {
    if (node.tagName === "LI") return node;
    var li = this.document.createElement("li");
    li.appendChild(node);
    return li;
  };

  // Sort the bucket.
  Bucket.prototype.sort = function() {
    var flags = Array.prototype.slice.call(this.element.children);
    var getNum = function(e) {return parseInt(e.textContent.match(/#(\d+)/)[1]);};

    var sorted = flags.sort(function(a, b) {
      return getNum(a) - getNum(b);
    });

    for (var i=0; i<sorted.length; ++i) {
      this.element.appendChild(sorted[i]);
    }
  };

  // Find all flags by traversing the tree.
  Bucket.prototype.bruteForce = function() {
    var flags = [];

    var finder = function(node) {
      if (node.nodeType === 3 && node.nodeValue.match(/FLAG #/)) {
        flags.push(node.parentNode);
      } else if (node.nodeType === 1) {
        for (var i=0; i<node.childNodes.length; ++i) {
          finder(node.childNodes[i]);
        }
      }
    };

    finder(document.body);
    for (var i=0; i<flags.length; i++) this.insert(flags[i]);
    this.sort();
  };

  var bucket = new Bucket(document, "#bucket ul");
  bucket.bruteForce();

  // var flag1 = document.querySelector(".main ul li.foo");
  // bucket.insert(flag1);
  //
  // var flag2 = document.querySelector(".new p span");
  // bucket.insert(flag2);
  //
  // var flag3 = document.querySelector(".footer div div");
  // bucket.insert(flag3.children[1].children[0]);
  //
  // var flag4 = document.querySelector("#article-3 span");
  // var flag5 = flag4.parentNode;
  // bucket.insert(flag4);
  // bucket.insert(flag5);
})(); // Keep this line too.
