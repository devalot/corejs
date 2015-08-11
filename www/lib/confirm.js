Confirm = function() {
  this.values = [];
  this.element = $("<ul></ul>").appendTo("body");
  this.currentTest = "Exercise 1";
};

Confirm.prototype = {
  confirm: function(value) {
    console.log("confirm called with", value);
    this.values.push(value);
  },

  assert: function(value, message) {
    if (!value) {
      this.record(false, message);
      throw message;
    }
  },

  assertInstanceOf: function(value, type) {
    this.assert(value !== undefined &&
                value !== null, "expected instance of " + type.toString() +
                " but got undefined or null instead");

    var message = "expected instance of " + type.toString() + " " +
        "but got " + value.constructor.toString() + " instead";
    this.assert(value.constructor == type, message);
  },

  refute: function(value, message) {
    this.assert(!value, message);
  },

  record: function(status, message) {
    message = this.currentTest + ": " + message;
    console.log(message);

    var li = $("<li></li>").appendTo(this.element);
    li.text(message);

    if (status) {
      li.addClass("pass");
    } else {
      li.addClass("fail");
    }
  },

  assertValues: function(checks) {
    this.currentTest = "Number of calls to confirm";

    this.refute(this.values.length < checks.length, "You didn't call test.confirm enough times");
    this.refute(this.values.length > checks.length, "You called test.confirm too many times");

    for (var i=0; i < checks.length; ++i) {
      var value = this.values[i],
          check = checks[i];

      this.currentTest = "Exercise " + (i+1);

      if (check instanceof Function) {
        var result = check(value, this);

        if (result === null) {
          this.record(true, "skipped");
          continue;
        }

        this.assert(result, "failed");
      } else {
        this.assert(value === check, "Should have been " + check.toString());
      }

      this.record(true, "passed");
    }
  },
};
