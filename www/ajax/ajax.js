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

  var TableHelper = function(id, rowFunc) {
    this.element = document.getElementById(id);
    this.rowFunc = rowFunc;
  };

  TableHelper.prototype.refresh =
    function(array) {
      var self = this;
      self.element.innerHTML = ""; // Clear the table of all rows.

      array.forEach(function(item) {
        self.element.appendChild(self.rowFunc(item));
      });
    };

  var artistsTable =
      new TableHelper("artists", function(artist) {
        var tr = document.createElement("tr");
        tr.setAttribute("data-artist-id", artist.id);

        var td = function() {
          return tr.appendChild(document.createElement("td"));
        };

        td().textContent = artist.name;
        td().textContent = artist.formation_year;
        td().textContent = artist.website;

        return tr;
      });

  var loadButton = document.querySelector("button");
  loadButton.addEventListener("click", function() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        artistsTable.refresh(JSON.parse(xhr.responseText));
      }
    });

    xhr.open("GET", "/api/artists");
    xhr.send();
  });

  var albumsTable =
      new TableHelper("details", function(album) {
        var tr = document.createElement("tr");

        tr.appendChild(document.createElement("td")).textContent = album.name;
        // other cells go here.

        return tr;
      });

  artistsTable.element.addEventListener("click", function(e) {
    var row = e.target;
    while (row && row.tagName != "TR") row = row.parentNode;

    var id = row.getAttribute("data-artist-id");
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        albumsTable.refresh(JSON.parse(xhr.responseText));
      }
    });

    xhr.open("GET", "/api/artists/" + id + "/albums");
    xhr.send();
  });
})();
