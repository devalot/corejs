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
  var button      = document.querySelector("body div button"),
      artistsList = document.getElementById("artists"),
      detailsList = document.getElementById("details");

  var setArtists = function(artists) {
    artistsList.innerHTML = ""; // Delete any existing artists.

    artists.forEach(function(artist) {
      var li = document.createElement("li");
      li.setAttribute("data-artist-id", artist.id);
      li.textContent = artist.name;
      artistsList.appendChild(li);
    });
  };

  var setDetails = function(artist) {
    detailsList.innerHTML = "";

    for (var p in artist) {
      var li = document.createElement("li");
      li.textContent = p + ": " + artist[p];
      detailsList.appendChild(li);
    }
  };

  button.addEventListener("click", function(event) {
    var request = new XMLHttpRequest();

    request.addEventListener("error", function() {
      console.error("WTF?");
    });

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        setArtists(JSON.parse(request.responseText));
      } else {
        console.error("server responded with: ", request.status);
      }
    });

    request.open("GET", "/api/artists");
    request.send();
  });

  artistsList.addEventListener("click", function(event) {
    var id = event.target.getAttribute("data-artist-id");
    if (!id) return;

    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        setDetails(JSON.parse(request.responseText));
      }
    });

    request.open("GET", "/api/artists/" + id);
    request.send();
  });

})();
