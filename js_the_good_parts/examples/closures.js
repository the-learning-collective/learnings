
// private variable through closure
var myObject = function () { 
  var value = 0;
  
  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () { return value;
    } 
  };
}();

// returns object with 
// .increment(inc) and .getValue methods 
// that mutate and retrieve private value var (respectively)

/* USAGE
  myObject.increment(3) -> undefined
  myObject.increment(5) -> undefined
  myObject.getValue() -> 8
*/

// recursive function that sets a DOM node's color
// to yellow and then fades it to white.
var fade = function (node) {
  var level = 1
  , step = function () {
    var hex = level.toString(16); 
    node.style.backgroundColor = '#FFFF' + hex + hex; 
    if (level < 15) { // base case
      level += 1;
      setTimeout(step, 100);
     }
  };
  setTimeout(step, 100); // recursive call
};
fade(document.body);


// Function (with nested-self-invoking function) that assigns event handler functions to an array of nodes theright way.
// When you click on a node, an alert box will display the ordinal of the node.
var add_the_handlers = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function (i) {
      return function (e) {
        alert(e);
      }; 
    }(i);
  } 
};