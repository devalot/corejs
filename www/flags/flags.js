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
 *   - document.querySelectorAll
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

  var bucket =
      document.getElementById("bucket");

  var bucketList =
      bucket.getElementsByTagName("ul")[0];

  var flag1 =
      document.querySelector(".main li.flag");

  bucketList.appendChild(flag1);

  var articles =
      document.getElementById("articles");

  var firstArticle =
      articles.querySelectorAll("article")[0];

  var flag2 =
      firstArticle.querySelector("p a span");

  var flag2LI = document.createElement("li");
  flag2LI.appendChild(flag2);
  bucketList.appendChild(flag2LI);

  var flag3 =
      document.querySelector(".footer div div").
      childNodes[3].childNodes[1];

  var li3 = document.createElement("li");
  li3.appendChild(flag3);
  bucketList.appendChild(li3);

  var flag4 =
      document.getElementById("article-3").
      querySelector("span");

  var li4 = document.createElement("li");
  li4.appendChild(flag4);
  bucketList.appendChild(li4);

  var flag5 =
      document.getElementById("article-3").
      querySelectorAll("p")[2];

  var li5 = document.createElement("li");
  li5.appendChild(flag5);
  bucketList.appendChild(li5);

})(); // Keep this line.
