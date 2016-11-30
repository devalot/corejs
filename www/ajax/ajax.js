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

var View = function(document, selector) {
  this.document = document;
  this.element  = document.querySelector(selector);
};

View.prototype.update = function(records) {
  var self = this;

  self.element.innerHTML = "";

  records.forEach(function(record) {
    self.insert(record);
  });
};

View.prototype.insert = function(record) {
  var li = this.document.createElement("li");
  li.textContent = record.content;
  li.setAttribute("data-id", record.id);
  this.element.appendChild(li);
};

var button = document.querySelector("button");
var view = new View(document, "#artists");
var altview = new View(document, "#details");

button.addEventListener("click", function(event) {
  var request = new XMLHttpRequest();

  request.addEventListener("load", function() {
    if (request.status < 200 || request.status > 299) return;
    var artists = JSON.parse(request.responseText);

    view.update(artists.map(function(artist) {
      return {
        content: artist.name,
        id:      artist.id,
      };
    }));
  });

  request.open("GET", "/api/artists");
  request.send();
});

view.element.addEventListener("click", function(event) {
  var id = event.target.getAttribute("data-id");
  if (!id) return;

  var request = new XMLHttpRequest();

  request.addEventListener("load", function() {
    if (request.status < 200 || request.status > 299) return;
    var artist = JSON.parse(request.responseText);
    altview.update([
      {content: "Name: " + artist.name},
      {content: "Formation Year: " + artist.formation_year},
      {content: "URL: " + artist.website},
    ]);
  });

  request.open("GET", "/api/artists/" + id);
  request.send();
});

})();
