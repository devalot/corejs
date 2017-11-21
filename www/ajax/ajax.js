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

  var GenericView = function(selector, callback) {
    this.element = document.querySelector(selector);
    this.callback = callback;
  };

  GenericView.prototype.render = function(data) {
    var self = this;

    this.element.innerHTML = ""; // Clear out the view.

    data.forEach(function(item) {
      var li = document.createElement("LI");
      self.callback(item, li);
      self.element.appendChild(li);
    });
  };

  GenericView.prototype.fetch = function(path) {
    var self = this;
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status === 200) {
        self.render(JSON.parse(request.responseText));
      }
    });

    // No error handling :(

    request.open("GET", path);
    request.send();
  };

  GenericView.prototype.onClick = function(handler) {
    this.element.addEventListener("click", function(e) {
      var li = e.target;
      while (li.tagName !== "LI") li = li.parentNode;
      handler(li);
    });
  };

  var button = document.querySelector("button");

  var artistsView = new GenericView("#artists", function(artist, li) {
    li.textContent = artist.name;
    li.setAttribute("data-artist-id", artist.id);
  });

  var albumsView = new GenericView("#details", function(album, li) {
    li.textContent = album.name;
  });

  artistsView.onClick(function(li) {
    var id = li.getAttribute("data-artist-id");
    if (id) albumsView.fetch("/api/artists/" + id + "/albums");
  });

  button.addEventListener("click", function() {
    artistsView.fetch("/api/artists");
  });

})();
