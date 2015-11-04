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

  var bucket = document.querySelector("#bucket ul");

  var addToBucket = function(element) {
    var li;

    if (element.tagName === "LI") {
      li = element;
    } else {
      li = document.createElement("li");
      li.appendChild(element);
    }

    bucket.appendChild(li);
  };

  // Search the DOM tree and record where the flags are.
  var walkAndMove = function(element) {
    if (element.childNodes && element.childNodes.length > 0) {
      for (var i=0; i<element.childNodes.length; ++i) {
        walkAndMove(element.childNodes[i]);
      }
    }

    if (element.nodeType === 3 &&
        element.nodeValue.match(/flag\s#\d/i))
    {
        walkAndMove.toMove.push(element);
    }
  };

  walkAndMove.toMove = [];
  walkAndMove(document);

  // Sort the flags and put them in the bucket.
  walkAndMove.toMove.sort(function(a, b) {
    var n = parseInt(a.nodeValue.match(/\d+/)),
        m = parseInt(b.nodeValue.match(/\d+/));
    return n - m;
  }).forEach(function(e) {
    addToBucket(e.parentNode);
  });

  // Find each flag manually:
  //
  // var flag1 = document.querySelector("div.main ul li.foo");
  // addToBucket(flag1);
  //
  // var flag2 = document.querySelector("#articles article p span");
  // addToBucket(flag2);
  //
  // var flag3Parent = document.querySelector("div.footer");
  //
  // var flag3 =
  //     flag3Parent.
  //     childNodes[1].
  //     childNodes[1].
  //     childNodes[3].
  //     childNodes[1];
  //
  // addToBucket(flag3);
  //
  // var flag4 = document.querySelector("#article-3 p span");
  // var flag5 = flag4.parentNode;
  //
  // addToBucket(flag4);
  // addToBucket(flag5);

})(); // Keep this line too.
