//memoizer (like inject)
var memoizer = function (memo, fundamental) {
  var shell = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};

/* USAGE
  var fibonacci = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
  });
  
  var factorial = memoizer([1, 1], function (shell, n) {
    return n * shell(n - 1);
  });
*/

var is_array = function (value) {
  return value &&
    typeof value === 'object' &&
    typeof value.length === 'number' &&
    typeof value.splice === 'function' &&
    !(value.propertyIsEnumerable('length'));
};

/* USAGE
  is_array([1,2,3]) // -> true
  is_array({one: 1, two: 2, three: 3}) // -> false
*/

