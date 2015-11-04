// <<: ctor
var Message = function(sender, content) {
  this.sender  = sender;
  this.content = content;
  this.length  = content.length;
};
// :>>

// <<: prototype
Message.prototype = {
  send: function() {
    if (this.length !== 0) {
      console.log(this.content);
    }
  },
};
// :>>

// <<: new
var m = new Message("pjones@devalot.com", "Hello");
m.send();
// :>>
