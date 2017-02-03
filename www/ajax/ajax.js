// In the index.html file there is a button.  When the button is
// clicked kick off an HTTP GET request to the following URL:
//
//   /api/artists
//
// The response text will be a JSON-encoded array of objects.  Inspect
// the response using the browser debugger and then insert the objects
// into the DOM.  Each artist in the response should be used to create
// a new <li> element in the existing <ul> container (the one with the
// ID of "artists").  Display the name of each artist inside the newly
// created <li> elements.
//
// BONUS #1:
//
// Clicking one of the <li> elements should display all information
// about the clicked artist in the <ul> with the ID of "details".
// (Hint: make another HTTP request to /api/artists/N where N is the
// artist ID.)
//
// BONUS #2:
//
// After displaying a list of artist details, also display a list of
// album names.  A list of albums can be fetched using the following
// URL:
//     /api/artists/N/albums
//
(function() {

  var Render = function(document, viewport) {
    this.document = document;
    this.element  = viewport;
  };

  Render.prototype.update = function(items) {
    var self = this;
    self.element.innerHTML = "";

    items.forEach(function(item) {
      var li = self.document.createElement("LI");
      li.textContent = item.name;
      li.setAttribute("data-item-id", item.id);
      self.element.appendChild(li);
    });
  };

  // Invoke `callback' when an item is clicked.
  Render.prototype.onClick = function(callback) {
    this.element.addEventListener("click", function(e) {
      var id = e.target.getAttribute("data-item-id");
      if (id) callback(id);
    });
  };

  var button  = document.querySelector("button");
  var artists = document.getElementById("artists");
  var render  = new Render(document, artists);

  button.addEventListener("click", function(event) {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        render.update(JSON.parse(request.responseText));
      }
    });

    request.open("GET", "/api/artists");
    request.send();
  });

  render.onClick(function(id) {
    // This is where you can do Bonus 1.
    console.log("artist with ID " + id + " was clicked");
  });
})();
