module.exports = function (constr, supr) {
  if(typeof Object.create === 'function') {
    constr.super_ = supr;
    constr.prototype = Object.create(supr.prototype, {
      constructor: {
        value: constr,
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  } else {
    constr.super_ = supr;
    function Temp () {}
    Temp.prototype = supr.prototype;
    constr.prototype = new Temp();
    constr.prototype.constructor = constr;
  }
}