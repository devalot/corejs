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
// BONUS:
//
// Clicking one of the <li> elements should display all information
// about the clicked artist in the <ul> with the ID of "details".
// (Hint: make another HTTP request to /api/artists/N where N is the
// artist ID.)
(function() {

  var button = document.querySelector("button");
  var artists = document.getElementById("artists");

  button.addEventListener("click", function(e) {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status !== 200) return;
      var objects = JSON.parse(request.responseText);

      objects.forEach(function(artist) {
        var li = document.createElement("li");
        li.textContent = artist.name;
        li.setAttribute("data-artist-id", artist.id);
        artists.appendChild(li);
      });

    });

    request.open("GET", "/api/artists");
    request.send();
  });

  var details = document.getElementById("details");

  artists.addEventListener("click", function(e) {
    var id = e.target.getAttribute("data-artist-id");
    if (id === null) return;

    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status !== 200) return;
      var info = JSON.parse(request.responseText);

      for (var p in info) {
        var li = document.createElement("li");
        li.textContent = p + ": " + info[p];
        details.appendChild(li);
      }
    });

    request.open("GET", "/api/artists/" + id);
    request.send();
  });

})();
