var Message = function(plain, secret) {
  this.getPlain = function() {
    return plain;
  };

  this.getSecret = function() {
    return secret;
  };
};

Message.prototype = {
  getBoth: function() {
    var both = this.getPlain() + "/" + this.getSecret();
    return both;
  }
};

var m = new Message("HI", "BYE");
console.log(m.getPlain());
console.log(m.getBoth());
