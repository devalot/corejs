Confirm = function() {
  this.values = [];
  this.element = $("<ul></ul>").appendTo("body");
};

Confirm.prototype = {
  confirm: function(value) {
    console.log("confirm called with", value);
    this.values.push(value);
  },

  assert: function(value, message) {
    if (!value) {
      console.error(message);
      this.record(false, message);
      throw message;
    }
  },

  refute: function(value, message) {
    this.assert(!value, message);
  },

  record: function(status, message) {
    var li = $("<li></li>").appendTo(this.element);
    li.text(message);

    if (status) {
      li.addClass("pass");
    } else {
      li.addClass("fail");
    }
  },

  assert_values: function(checks) {
    this.refute(this.values.length < checks.length, "You didn't call test.confirm enough times");
    this.refute(this.values.length > checks.length, "You called test.confirm too many times");

    for (var i=0; i < checks.length; ++i) {
      var value = this.values[i],
          check = checks[i],
          name  = "Exercise " + (i+1);

      if (check instanceof Function) {
        this.assert(check(value, this, name), name + ": failed");
      } else {
        this.assert(value === check, name + ": Should have been " + check.toString());
      }

      this.record(true, name + ": passed");
    }
  },
};
