/******************************************************************************/
// <<: before
function foo() {
  if (true) {
    var x = 42;
    console.log(x);
  }

  var y = "foo";
  console.log(y);
}
// :>>

foo();

/******************************************************************************/
// <<: after
function foo() {
  var x, y;

  if (true) {
    x = 42;
    console.log(x);
  }

  y = "foo";
  console.log(y);

  // x === 42
  // y === "foo"
}
// :>>

foo();
