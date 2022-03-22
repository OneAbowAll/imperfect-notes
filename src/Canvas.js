"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = exports.DrawingCanvas = void 0;
const Debug_1 = require("./Debug");
const Shapes_1 = require("./Shapes");
class DrawingCanvas {
    constructor(canvas, width, height, color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.currentPen = null;
        this.bcr = canvas.getBoundingClientRect();
        //Setta canvas
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        this.canvas.style.setProperty("margin-left", -this.canvas.width / 2 + "px");
        this.canvas.style.setProperty("margin-top", -this.canvas.height / 2 + "px");
        //Init gli elementi
        this.shapes = [new Shapes_1.Rectangle(0, 0, this.canvas.width, this.canvas.height, color)];
        //Set up event listeners
        this.canvas.addEventListener("mousemove", (e) => this.WritingHandler(e));
        this.canvas.addEventListener("mousedown", (e) => this.PenHandler(e));
        //this.canvas.addEventListener("mouseup", (e)=>this.PenHandler(e));
        this.Refresh();
    }
    Refresh(updatedShape) {
        if (this.ctx == null)
            return;
        if (updatedShape)
            this.shapes[this.shapes.length - 1] = updatedShape;
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const len = this.shapes.length;
        for (let i = 0; i < len; i++)
            this.shapes[i].Draw(this.ctx);
        Debug_1.Debug.AddToShapeList(this.shapes);
    }
    DrawBackground(color) {
        let bg = this.shapes[0];
        bg.color = color;
        this.Refresh();
    }
    DrawRect(x = 0, y = 0, width = 0, height = 0, color) {
        //Recenter Coords
        x += this.canvas.width / 2;
        y = this.canvas.height / 2 - y;
        width *= 2;
        height *= 2;
        this.DrawShape(new Shapes_1.Rectangle(x, y, width, height, color));
    }
    DrawCircle(x = 0, y = 0, radius = 0, color) {
        //Recenter Coords
        x += this.canvas.width / 2;
        y = this.canvas.height / 2 + y;
        this.DrawShape(new Shapes_1.Circle(x, y, radius, color));
    }
    DrawPath(path, stroke, color) {
        this.DrawShape(new Shapes_1.Path(path, stroke, color));
    }
    //Ricorda che teoricamente DrawShape dovrebbe essere la base per tutti gli altri Draw... ora come ora va bene quindi :)
    DrawShape(shape) {
        if (this.ctx == null)
            return;
        this.shapes.push(shape);
        this.Refresh();
    }
    DestroyShape(index) {
        if (!index)
            index = this.shapes.length - 1;
        this.shapes.slice(index, 1);
    }
    PenHandler(e) {
        var _a, _b;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e instanceof MouseEvent)
            (_a = this.currentPen) === null || _a === void 0 ? void 0 : _a.Click(e);
        else
            (_b = this.currentPen) === null || _b === void 0 ? void 0 : _b.ClickTouch(e);
    }
    WritingHandler(e) {
        var _a, _b;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e instanceof MouseEvent)
            (_a = this.currentPen) === null || _a === void 0 ? void 0 : _a.Update(e);
        else
            (_b = this.currentPen) === null || _b === void 0 ? void 0 : _b.UpdateTouch(e);
    }
    SetPen(pen) {
        this.currentPen = pen;
    }
}
exports.DrawingCanvas = DrawingCanvas;
class Color {
    constructor(hex, r = 0, g = 0, b = 0) {
        if (hex)
            this.hex = hex;
        else
            this.hex = this.ToHex(r, g, b);
    }
    static FromHex(hex) {
        let color = new Color(hex);
        return color;
    }
    ToHex(r, g, b) {
        let hR = r.toString(16);
        let hG = g.toString(16);
        let hB = b.toString(16);
        return "#" + (hR.length == 1 ? "0" + hR : hR) + (hG.length == 1 ? "0" + hG : hG) + (hB.length == 1 ? "0" + hB : hB);
    }
    ToRGB() {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex);
        if (result === null)
            return 'rgb(0, 0, 0)';
        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}
exports.Color = Color;
