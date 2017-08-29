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

var View = function(selector) {
  this.element = document.querySelector(selector);
  this.items = [];
};

View.prototype.render = function(items, callback) {
  var self = this;
  self.items = items;
  self.element.innerHTML = "";

  self.items.forEach(function(item, index) {
    var li = document.createElement("LI");
    li.setAttribute("data-item-id", index);
    li.textContent = callback(item);
    self.element.appendChild(li);
  });
};

View.prototype.clicked = function(callback) {
  var self = this;

  this.element.addEventListener("click", function(e) {
    var id = e.target.getAttribute("data-item-id");
    if (id !== null && self.items[id]) callback(self.items[id]);
  });
};

var getJSON = function(url, callback) {
  var request = new XMLHttpRequest();

  request.addEventListener("load", function() {
    if (request.status >= 200 && request.status < 300) {
      callback(JSON.parse(request.responseText));
    }
  });

  request.open("GET", url);
  request.send();
};

var button = document.querySelector("button");
var artistView = new View("#artists");

button.addEventListener("click", function() {
  getJSON("/api/artists", function(artists) {
    artistView.render(artists, function(artist) {
      return artist.name + " (" +
        artist.formation_year + ")";
    });
  });
});

artistView.clicked(function(artist) {
  var albumsView = new View("#details");

  getJSON("/api/artists/" + artist.id + "/albums",
          function(albums) {
            albumsView.render(albums, function(album) {
              return album.name;
            });
          });
});
})();
