"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = exports.Circle = exports.Rectangle = void 0;
class Rectangle {
    constructor(x, y, w, h, color) {
        this.position = { x: x, y: y };
        this.size = { x: w, y: h };
        this.color = color;
    }
    Draw(ctx) {
        let oldColor = ctx.fillStyle;
        ctx.fillStyle = this.color.hex;
        let { x, y } = this.position;
        let { x: w, y: h } = this.size;
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = oldColor;
    }
}
exports.Rectangle = Rectangle;
class Circle {
    constructor(x, y, radius, color) {
        this.position = { x: x, y: y };
        this.radius = radius;
        this.color = color;
    }
    Draw(ctx) {
        let oldColor = ctx.strokeStyle;
        let { x, y } = this.position;
        ctx.strokeStyle = this.color.hex;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = oldColor;
    }
}
exports.Circle = Circle;
class Path {
    constructor(path, stroke, color) {
        this.position = { x: 0, y: 0 };
        this.color = color;
        this.stroke = stroke;
        this.path = path;
    }
    Draw(ctx) {
        let oldColor = ctx.fillStyle;
        ctx.fillStyle = this.color.hex;
        ctx.fill(this.path);
        ctx.fillStyle = oldColor;
    }
}
exports.Path = Path;
