// FUNCTIONAL CONTRUCTOR PATTERN

// INSTEAD OF THIS (PSEUDO-CLASSICAL):

//constructor
function SomeClass(attr1, attr2, secret, ssn){
  this.attr1 = attr1
  this.attr2 = attr2
  this.secret = secret // not really secret!
  var ssn = ssn // not accessible once object constructed!
}

//invoking instructor
var some_instance = new SomeClass( 'first_attribute', 'second_attribute', "dont' tell!", "555-55-5555" )

// DO THIS:

//constructor
var some_class = function(spec, my){

  //attributes
  var that = spec // public 
  , my = my || {} // private
  
  //methods 
  , reveal_secret = function(){
      return my.secret
    }
  , ssn_last_4 = function(){
      return my.ssn.slice(-4,my.ssn.length)
    }

  //public methods (can clone private methods)
  that.reveal_secret = reveal_secret
  that.ssn_last_4 = ssn_last_4

  return that
}

//invoking constructor
var some_instance = some_class(
  { attr1: 'first_attribute', attr2: 'second_attribute' }, 
  { secret: "don't tell!", ssn: '555-55-5555' }
)

////************************************************************************************************//////


// CONSTRUCTING FROM PARTS

var eventuality = function (that) {
  var registry = {};
  
  that.fire = function (event) {
    
    // Fire an event on an object. The event can be either
    // a string containing the name of the event or an
    // object containing a type property containing the
    // name of the event. Handlers registered by the 'on'
    // method that match the event name will be invoked.
    var array
    , func
    , handler
    , i
    , type = typeof event === 'string' ? event : event.type;
    
    // If an array of handlers exist for this event, then
    // loop through it and execute the handlers in order.
    if (registry.hasOwnProperty(type)) {
      array = registry[type];
      
      for (i = 0; i < array.length; i += 1) {
        handler = array[i];
        // A handler record contains a method and an optional
        // array of parameters. If the method is a name, look
        // up the function.
        func = handler.method;
        if (typeof func === 'string') {
          func = this[func];
        }
        // Invoke a handler. If the record contained
        // parameters, then pass them. Otherwise, pass the
        // event object.
        func.apply(this, handler.parameters || [event]);
      } 
    }
    return this;
  };
  that.on = function (type, method, parameters) {
    // Register an event. Make a handler record. Put it
    // in a handler array, making one if it doesn't yet
    // exist for this type.
    var handler = {
      method: method,
      parameters: parameters
    };
    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
    };
  return that;
};

/* USAGE
  // to give an object event-handling capabilities
    // for an already constructed object:
    eventuality(some_object); 
    //inside constructor
    eventuality(that);
*/

