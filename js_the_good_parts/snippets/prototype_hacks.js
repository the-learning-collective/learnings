
// OBJECT CREATION
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}

/* USAGE
  stooge = { name: 'moe' }
  var another_stooge = Object.create(stooge);
  another_stooge.name = 'curly'
*/


// METHOD-ADDING PATTERN
Function.prototype.method = function (name, func) {
         this.prototype[name] = func;
         return this;
};

/* USAGE
  Number.method('integer', function () {
    return Math[this < 0 ? 'ceiling' : 'floor'](this);
  });
*/

// FUNCTION CURRYING
Function.method('curry', function () { 
  var slice = Array.prototype.slice
  , args = slice.apply( arguments ) // use slice.apply to convert arguments to arr
  , that = this; 
  return function () {
    return that.apply( null, args.concat( slice.apply( arguments ) ) ); // use slice.apply to convert arguments to arr
  };
});


/* USAGE
  var add = function(num1, num2){
    return num1 + num2
  }
  , add1 = add.curry(1);
  document.writeln(add1(6)); // -> 7
*/

// REDUCE ARRAY 
Array.method('reduce', function (f, value) {
  var i;
  for (i = 0; i < this.length; i += 1) {
    value = f(this[i], value);
  }
  return value;
});

/* USAGE
  var data = [4, 8, 15, 16, 23, 42]
  , add = function(num1, num2){
    return num1 + num2
  }
  var sum = data.reduce(add, 0); // sum is 108
*/

// SET DEFAULT ARRAY VALUES
Array.dim = function (dimension, initial) {
  var a = [], i;
  for (i = 0; i < dimension; i += 1) {
    a[i] = initial;
  }
  return a; 
};

/* USAGE
  var myArray = Array.dim(10, 0); // -> Array populated with 10 zeros
*/

// BUILD MATRIX
Array.matrix = function (m, n, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = initial;
    }
    mat[i] = a; 
  }
  return mat;
};

/* USAGE
  var myMatrix = Array.matrix(4, 4, 0); // -> 4x4 matrix populated with zeros
*/




