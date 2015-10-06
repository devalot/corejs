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

  var button  = document.querySelector("button"),
      list    = document.getElementById("artists"),
      details = document.getElementById("details");

  var resetList = function(artists) {
    list.innerHTML = ""; // Clear the <UL>.

    artists.forEach(function(artist) {
      var li = document.createElement("li");
      li.innerText = artist.name;
      li.setAttribute("data-artist-id", artist.id);
      list.appendChild(li);
    });
  };

  button.addEventListener("click", function(e) {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        resetList(JSON.parse(request.responseText));
      }
    });

    request.open("GET", "/api/artists");
    request.send();
  });

  var resetDetails = function(artist) {
    details.innerHTML = "";

    for (var p in artist) {
      var li = document.createElement("li");
      li.innerText = p + ": " + artist[p];
      details.appendChild(li);
    }
  };

  list.addEventListener("click", function(e) {
    var id = e.target.getAttribute("data-artist-id");
    if (!id) return;

    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 300) {
        resetDetails(JSON.parse(request.responseText));
      }
    });

    request.open("GET", "/api/artists/" + id);
    request.send();
  });

})();
