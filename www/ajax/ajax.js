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
  // An object that can build generic <UL> lists.
  var ListBuilder = function(element) {
    this.element = element;
  };

  ListBuilder.prototype.insert = function(values) {
    var self = this;
    self.element.innerHTML = ""; // Clear the <UL>.

    values.forEach(function(v) {
      var e = document.createElement("li");
      e.textContent = v.name + " ";
      e.setAttribute("data-artist-id", v.id);

      if ("value" in v) {
        var span = document.createElement("span");
        span.textContent = v.value;
        e.appendChild(span);
      }

      self.element.appendChild(e);
    });
  };

  var Artists = function() {
    this.element = document.getElementById("artists");

    var self = this;
    this.element.addEventListener("click", function(event) {
      self.clicked(event.target);
    });
  };

  Artists.prototype.load = function() {
    var self    = this;
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status < 200 || request.status >= 300) return;
      var list = new ListBuilder(self.element);
      list.insert(JSON.parse(request.responseText));
    });

    request.open("GET", "/api/artists");
    request.send();
  };

  Artists.prototype.clicked = function(element) {
    var id = element.getAttribute("data-artist-id");
    if (!id) return;

    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      if (request.status < 200 || request.status >= 300) return;
      var list    = new ListBuilder(document.getElementById("details"));
      var details = JSON.parse(request.responseText);
      var values  = [];

      for (var p in details) {
        values.push({name: p, value: details[p]});
      }

      list.insert(values);
    });

    request.open("GET", "/api/artists/" + id);
    request.send();
  };

  var view = new Artists();

  document.querySelector("button").
    addEventListener("click", view.load.bind(view));
})();
