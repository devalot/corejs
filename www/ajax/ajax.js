// In the index.html file there is a button.  When the button is
// clicked kick off an HTTP GET request to the following URL:
//
//   /api/artists
//
// The response text will be a JSON-encoded array of objects.  Inspect
// the response using the browser debugger and then insert the objects
// into the DOM.  Each artist in the response should be used to create
// a new <li> element in the existing <ul> container.
(function() {
  var button = document.getElementsByTagName("button")[0];
  var container = document.getElementById("artists");
  var details = document.getElementById("details");

  container.addArtist = function(artist) {
    var li = document.createElement("li");
    li.innerText = artist.name;
    li.setAttribute("data-artist-id", artist.id);
    this.appendChild(li);
  };

  details.addArtistDetail = function(name, value) {
    var li = document.createElement("li");
    li.innerText = name + ": " + value;
    this.appendChild(li);
  };

  button.addEventListener("click", function() {
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status !== 200) return;

      var artists = JSON.parse(request.responseText);
      container.innerHTML = "";

      artists.forEach(function(artist) {
        container.addArtist(artist);
      });
    });

    request.open("GET", "/api/artists");
    request.send();
  });

  container.addEventListener("click", function(e) {
    var id = e.target.getAttribute("data-artist-id");
    if (!id) return;

    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status !== 200) return;

      var artist = JSON.parse(request.responseText);
      details.innerHTML = "";

      for (var prop in artist) {
        details.addArtistDetail(prop, artist[prop]);
      }
    });

    request.open("GET", "/api/artists/" + id);
    request.send();
  });
})();
