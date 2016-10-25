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
  var View = function(document, element, render) {
    this.document = document;
    this.element  = element;
    this.render   = render;
  };

  View.prototype.set = function(records) {
    var self = this;
    this.element.innerHTML = "";

    records.forEach(function(record) {
      var li = self.document.createElement("LI");
      li.textContent = self.render(record);
      li.setAttribute("data-record-id", record.id);
      self.element.appendChild(li);
    });
  };

  var button = document.querySelector("button");
  var artists = document.getElementById("artists");

  var artistView = new View(document, artists, function(artist) {
    return artist.name + " (" + artist.formation_year + ")";
  });

  button.addEventListener("click", function() {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        artistView.set(JSON.parse(request.responseText));
      }
    });

    request.open("GET", "/api/artists");
    request.send();
  });

  var details = document.getElementById("details");
  var detailsView = new View(document, details, function(album) {
    return album.name;
  });

  artistView.element.
    addEventListener("click", function(e) {
      var id = event.target.
          getAttribute("data-record-id");

      if (!id) return;

      var request = new XMLHttpRequest();

      request.addEventListener("load", function() {
        if (request.status < 200 || request.status >= 300) return;
        detailsView.set(JSON.parse(request.responseText));
      });

      request.open("GET", "/api/artists/" + id + "/albums");
      request.send();
    });
})();
