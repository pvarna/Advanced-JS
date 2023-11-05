function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.getDistance = function(point2) {
    const dx = this.x - point2.x;
    const dy = this.y = point2.y;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function Circle(x, y, r) {
    Point.call(this, x, y);
    this.r = r;
}

Circle.prototype = Object.create(Point.prototype);

Point.prototype.getCircumference = function() {
    return 2 * Math.PI * this.r;
}

Point.prototype.gerArea = function () {
    return Math.PI * this.r * this.r;
}

Point.prototype.intersects = function(circle2) {
    const distance = this.getDistance(circle2);

    return distance < this.r + circle2.r;
}

function Rectangle(x, y, a, b) {
    Point.call(this, x, y);
    this.a = a;
    this.b = b;
}

Rectangle.prototype = Object.create(Point.prototype);

Rectangle.prototype.getPerimeter = function () {
    return 2 * (this.a + this.b);
}

Rectangle.prototype.getArea = function () {
    return this.a * this.b;
}

Rectangle.prototype.getLengthOfDiagonals = function () {
    const diagonal = Math.sqrt (this.a * this.a + this.b * this.b);

    return [diagonal, diagonal];
}

Rectangle.prototype.getBiggestCircle = function () {
    const centerX = this.x + this.a / 2;
    const centerY = this.y + this.b / 2;
    const radius = Math.min(this.a, this.b) / 2;

    return new Circle(centerX, centerY, radius);
}

function RectanglePrism(x, y, a, b, c) {
    Rectangle.call(x, y, a, b);
    this.c = c;
}

RectanglePrism.prototype = Object.create(Rectangle.prototype);

RectanglePrism.prototype.getVolume = function () {
    return this.a * this.b * this.c;
}

const ColorMixin = {
    setColor(color) {
        this.color = color;
    },
    getColor() {
        return this.color;
    }
}

Object.assign(Point.prototype, ColorMixin);

const redPoint = new Point(1, 1);
const redCircle = new Circle(1, 1);
redPoint.setColor("red");
redCircle.setColor("red");

console.log(`The color of the point is ${redPoint.getColor()}`);
console.log(`The color of the circle is ${redCircle.getColor()}`);