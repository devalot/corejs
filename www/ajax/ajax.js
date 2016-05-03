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
  var Details = function(artistID) {
    this.element = document.getElementById("details");
    this.id = artistID;
  };

  Details.prototype = {
    load: function() {
      var request = new XMLHttpRequest(),
          self    = this;

      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 300) {
          self.set(JSON.parse(request.responseText));
        }
      });

      request.open("GET", "/api/artists/" + self.id);
      request.send();
    },

    set: function(artist) {
      var element = this.element;
      element.innerHTML = "";

      for (var p in artist) {
        var li = document.createElement("li");
        li.textContent = p + ": " + artist[p];
        element.appendChild(li);
      }
    },
  };

  var Artists = function() {
    this.element = document.getElementById("artists");
  };

  Artists.prototype = {
    error: function(message) { // Replace with real error handling!
      throw message;
    },

    load: function() { // Fetch artists from the server.
      var request = new XMLHttpRequest(),
          self    = this;

      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 300) {
          self.set(JSON.parse(request.responseText));
        } else {
          self.error("bad status code: " + request.status);
        }
      });

      request.addEventListener("error", function() {
        self.error("server or network is busted!");
      });

      request.open("GET", "/api/artists");
      request.send();
    },

    set: function(artists) { // Update the UI.
      var self = this;

      self.element.innerHTML = ""; // Clear the UI.

      artists.forEach(function(artist) {
        var li = document.createElement("li");
        li.textContent = artist.name;
        li.setAttribute("data-artist-id", artist.id);
        self.element.appendChild(li);
      });

      self.element.addEventListener("click", function(e) {
        self.click(e.target);
      });
    },

    click: function(node) {
      var id = node.getAttribute("data-artist-id");
      if (!id) return;

      var details = new Details(id);
      details.load();
    },
  };

  document.querySelector("button").
    addEventListener("click", function() {
      var artists = new Artists();
      artists.load();
    });
})();
