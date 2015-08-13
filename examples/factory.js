// This will become the prototype.
var baseFruit = {
  logColor: function() {
    console.log(this.color);
  },
  logName: function() {
    console.log(this.name);
  }
};

// Factory function (hand-made constructor).
// <<: factory
var createFruit = function(name, color) {
  var fruit = Object.create(baseFruit);

  fruit.name  = name;
  fruit.color = color;

  return fruit;
};

var apple = createFruit("apple", "red");
// :>>
apple.logColor();
