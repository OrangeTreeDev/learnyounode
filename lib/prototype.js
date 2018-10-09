function Shape(x, y) {
  this.x = x;
  this.y = y;
}

Shape.prototype.area = function() {
  return this.x * this.y;
}

function Rectangle(x, y) {
  if(!(this instanceof Rectangle)) return new Rectangle(x, y);
  Shape.call(this, x, y);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.perimeter = function () {
  return 2 * x + 2 * y;
}

var rec = new Rectangle(2, 2);
// instanceof 操作符，检测class的prototype 属性是否存在对象的原型链中（__proto__）
console.log(rec instanceof Rectangle); // true
console.log(rec instanceof Shape); // true
console.log(Object.getPrototypeOf(Rectangle.prototype));