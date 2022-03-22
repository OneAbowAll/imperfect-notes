"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eraser = exports.LivePen = exports.StresTestPen = exports.NormalPen = void 0;
const Canvas_1 = require("./Canvas");
const Shapes_1 = require("./Shapes");
const perfect_freehand_1 = require("perfect-freehand");
function BuildStroke(stroke, settings) {
    //Calcola stroke
    let smoothedStroke = (0, perfect_freehand_1.getStroke)(stroke, settings);
    //Converti in svg
    if (!smoothedStroke.length)
        return { original: [], svg: "" };
    const pathData = smoothedStroke.reduce((acc, [x0, y0], i, arr) => {
        const [x1, y1] = (((i + 1) % arr.length) == 0) ? arr[i] : arr[(i + 1)];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
    }, ['M', ...smoothedStroke[0], 'Q']);
    return { original: smoothedStroke, svg: pathData.join(' ') };
}
class NormalPen {
    constructor(canvas, settings) {
        this.penDown = false;
        this.canvas = canvas;
        //canvas.SetPen(this);
        this.penSettings = settings.penSettings;
        this.strokeSettings = settings.strokeSettings;
        this.currentStroke = [];
    }
    Update(e) {
        if (!this.penDown)
            return;
        //Fixxa sto obrobrio :(((
        let x = e.offsetX - this.canvas.width / 2;
        let y = -e.offsetY + this.canvas.height / 2;
        this.currentStroke.push({ x: e.offsetX, y: e.offsetY });
        //console.table("Penna"+{x: e.offsetX, y: e.offsetY});
        let d = BuildStroke(this.currentStroke, this.strokeSettings);
        let s = new Shapes_1.Path(new Path2D(d.svg), d.original, this.penSettings.color);
        this.canvas.Refresh(s);
        //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
    }
    Click(e) {
        this.penDown = !this.penDown;
        if (!this.penDown)
            this.currentStroke = [];
        else {
            this.currentStroke.push({ x: e.offsetX, y: e.offsetY });
            let d = BuildStroke(this.currentStroke, this.strokeSettings);
            this.canvas.DrawShape(new Shapes_1.Path(new Path2D(d.svg), d.original, this.penSettings.color));
        }
    }
    UpdateTouch(e) {
        if (!this.penDown)
            return;
        let touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            let touch = touches[i];
            let touchX = touch.pageX - this.canvas.bcr.left;
            let touchY = touch.pageY - this.canvas.bcr.top;
            let pressure = touch.force;
            this.currentStroke.push({ x: touchX, y: touchY, pressure: pressure });
            let d = BuildStroke(this.currentStroke, this.strokeSettings);
            let s = new Shapes_1.Path(new Path2D(d.svg), d.original, this.penSettings.color);
            this.canvas.Refresh(s);
        }
    }
    ClickTouch(e) {
        e.preventDefault();
        this.penDown = !this.penDown;
        if (this.penDown) {
            let touches = e.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                let touch = touches[i];
                let touchX = touch.pageX - this.canvas.bcr.left;
                let touchY = touch.pageY - this.canvas.bcr.top;
                let pressure = touch.force;
                this.currentStroke.push({ x: touchX, y: touchY, pressure: pressure });
            }
            //let d = this.BuildPath(this.currentStroke);
            this.canvas.DrawPath(new Path2D(""), [], this.penSettings.color);
        }
        else {
            this.currentStroke = [];
        }
    }
}
exports.NormalPen = NormalPen;
class StresTestPen {
    constructor(canvas, settings) {
        this.penDown = false;
        this.canvas = canvas;
        //canvas.SetPen(this);
        this.penSettings = settings.penSettings;
        this.strokeSettings = settings.strokeSettings;
        this.currentStroke = [];
    }
    Update(e) {
    }
    Click(e) {
        let res = this.StresTest();
        const start = setInterval(() => {
            let t = res.next();
            if (t.done === true) { // *** Use it here...
                clearInterval(start);
            }
            else {
                console.log(t.value); // *** ...and here
            }
        }, 50);
    }
    *StresTest() {
        for (let i = 0; i < 100; i++) {
            this.currentStroke = [];
            let oX = (Math.random() * (1100 - 10)) + 10;
            let oY = (Math.random() * (600 - 10)) + 10;
            let rX = (Math.random() * (Math.PI + 0)) - 0;
            let rY = (Math.random() * (Math.PI + 0)) - 0;
            let direction = { x: rX, y: rY };
            this.canvas.DrawPath(new Path2D(""), [], this.penSettings.color);
            let angle = 0;
            for (let index = 0; index < 300; index++) {
                direction.x += 1;
                direction.y += 1;
                direction = { x: 20 * Math.cos(direction.x), y: 20 * Math.sin(direction.y) };
                this.currentStroke.push({ x: oX + (direction.x + 10 * index), y: oY + (direction.y + 10 * index) });
                let d = BuildStroke(this.currentStroke, this.strokeSettings);
                let s = new Shapes_1.Path(new Path2D(d.svg), d.original, this.penSettings.color);
                this.canvas.Refresh(s);
                yield false;
            }
        }
        yield true;
    }
    UpdateTouch(e) {
        if (!this.penDown)
            return;
        let touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            let touch = touches[i];
            let touchX = touch.pageX - this.canvas.bcr.left;
            let touchY = touch.pageY - this.canvas.bcr.top;
            let pressure = touch.force;
            this.currentStroke.push({ x: touchX, y: touchY, pressure: pressure });
            let d = BuildStroke(this.currentStroke, this.strokeSettings);
            let s = new Shapes_1.Path(new Path2D(d.svg), d.original, this.penSettings.color);
            this.canvas.Refresh(s);
        }
    }
    ClickTouch(e) {
        e.preventDefault();
        this.penDown = !this.penDown;
        if (this.penDown) {
            let touches = e.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                let touch = touches[i];
                let touchX = touch.pageX - this.canvas.bcr.left;
                let touchY = touch.pageY - this.canvas.bcr.top;
                let pressure = touch.force;
                this.currentStroke.push({ x: touchX, y: touchY, pressure: pressure });
            }
            //let d = this.BuildPath(this.currentStroke);
            this.canvas.DrawPath(new Path2D(""), [], this.penSettings.color);
        }
        else {
            this.currentStroke = [];
        }
    }
}
exports.StresTestPen = StresTestPen;
class LivePen {
    constructor(canvas, settings) {
        this.penDown = false;
        this.canvas = canvas;
        //canvas.SetPen(this);
        this.penSettings = settings.penSettings;
        this.strokeSettings = settings.strokeSettings;
        this.aliveShape = new Shapes_1.Circle(0, 0, 20, new Canvas_1.Color("#0000ff"));
    }
    Update(e) {
        if (!this.penDown)
            return;
        //Fixxa sto obrobrio :(((
        //let x = e.offsetX - this.canvas.canvas.width/2;
        //let y = -e.offsetY + this.canvas.canvas.height/2;
        this.aliveShape.position = { x: e.offsetX, y: e.offsetY };
        this.canvas.Refresh();
        //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
    }
    Click(e) {
        this.penDown = !this.penDown;
        this.aliveShape.position = { x: e.offsetX, y: e.offsetY };
        this.canvas.DrawShape(this.aliveShape);
    }
    UpdateTouch(e) {
        if (!this.penDown)
            return;
        let touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            let touch = touches[i];
            let touchX = touch.pageX - this.canvas.bcr.left;
            let touchY = touch.pageY - this.canvas.bcr.top;
            let pressure = touch.force;
            this.aliveShape.position = { x: touchX, y: touchY };
            this.canvas.Refresh();
            //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
        }
    }
    ClickTouch(e) {
        e.preventDefault();
        this.penDown = !this.penDown;
        if (this.penDown) {
            let touches = e.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                let touch = touches[i];
                let touchX = touch.pageX - this.canvas.bcr.left;
                let touchY = touch.pageY - this.canvas.bcr.top;
                let pressure = touch.force;
                this.aliveShape.position = { x: touchX, y: touchY };
                this.canvas.DrawShape(this.aliveShape);
            }
        }
    }
}
exports.LivePen = LivePen;
class Eraser {
    constructor(canvas, settings) {
        this.penDown = false;
        this.canvas = canvas;
        //canvas.SetPen(this);
        this.penSettings = settings.penSettings;
        this.strokeSettings = settings.strokeSettings;
        this.aliveShape = new Shapes_1.Circle(0, 0, 20, new Canvas_1.Color("#0000ff"));
    }
    Update(e) {
        if (!this.penDown)
            return;
        //Fixxa sto obrobrio :(((
        //let x = e.offsetX - this.canvas.canvas.width/2;
        //let y = -e.offsetY + this.canvas.canvas.height/2;
        this.aliveShape.position = { x: e.offsetX, y: e.offsetY };
        let lastShape = this.canvas.shapes[this.canvas.shapes.length - 1];
        if (this.IsPathInsideCircle(lastShape)) {
            this.canvas.shapes.pop();
            this.canvas.Refresh(undefined);
        }
        //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
    }
    Click(e) {
        this.penDown = !this.penDown;
        this.aliveShape.position = { x: e.offsetX, y: e.offsetY };
        let lastShape = this.canvas.shapes[this.canvas.shapes.length - 1];
        if (this.IsPathInsideCircle(lastShape)) {
            this.canvas.shapes.pop();
            this.canvas.Refresh();
        }
        //this.canvas.DrawShape(this.aliveShape);
    }
    UpdateTouch(e) {
        if (!this.penDown)
            return;
        let touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            let touch = touches[i];
            let touchX = touch.pageX - this.canvas.bcr.left;
            let touchY = touch.pageY - this.canvas.bcr.top;
            let pressure = touch.force;
            this.aliveShape.position = { x: touchX, y: touchY };
            let lastShape = this.canvas.shapes[this.canvas.shapes.length - 1];
            this.canvas.Refresh();
            //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
        }
    }
    ClickTouch(e) {
        e.preventDefault();
        this.penDown = !this.penDown;
        if (this.penDown) {
            let touches = e.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                let touch = touches[i];
                let touchX = touch.pageX - this.canvas.bcr.left;
                let touchY = touch.pageY - this.canvas.bcr.top;
                let pressure = touch.force;
                this.aliveShape.position = { x: touchX, y: touchY };
                this.canvas.DrawShape(this.aliveShape);
            }
        }
    }
    IsPathInsideCircle(path) {
        let radius = 20;
        let origin = this.aliveShape.position;
        let points = path.stroke;
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if ((origin.x - radius) <= point[0] && point[0] <= (origin.x + radius)
                && (origin.y - radius) <= point[1] && point[1] <= (origin.y + radius))
                return true;
            //console.table(origin.x +"/"+origin.y+" con "+ point);
        }
        return false;
    }
    RemovePathInsideCircle(path) {
        let radius = 20;
        let origin = this.aliveShape.position;
        let points = path.stroke;
        console.log(path);
        console.log(path.position);
        console.log(path.stroke);
        points.filter((point) => (!((origin.x + radius) >= point[0] && (origin.x - radius) <= point[0]) //Proiezione su X
            && !((origin.y + radius) >= point[1] && (origin.y - radius) <= point[1]))); //Proiezione su Y
        /*for (let i = 0; i < points.length; i++) {
            const pointX = points[i].x;
    
            if((origin.x + radius) >= pointX && (origin.x - radius) <= pointX)
                possiblePoints.push([i, points[i]]);
        }


        //Flatten on Y axis all the possible points
        for (let i = points.length; i >= 0; i--) {
            const pointY = possiblePoints[i][1].y;
    
            if(!((origin.y + radius) >= pointY && (origin.y - radius) <= pointY))
                possiblePoints.splice(i, 1);
        }*/
        return points;
        //path.stroke = points;
        //path.path = new Path2D(BuildStroke(points).svg);
    }
}
exports.Eraser = Eraser;
/*
export class Ereaser {
    canvas: DrawingCanvas;
    penDown:boolean;

    penSettings: {};
    strokeSettings : {};

    aliveShape: Shape;
    strokes: Stroke[];
    currentStroke: Stroke;

    constructor(canvas: DrawingCanvas, settings: {penSettings: {}, strokeSettings: {}}) {
        this.penDown = false;
        this.canvas = canvas;
        //canvas.SetPen(this);
    
        this.penSettings = settings.penSettings;
        this.strokeSettings = settings.strokeSettings;

        this.strokes = [];
        this.currentStroke = [];

        this.aliveShape = new Circle(0, 0, 20, new Color("#0000ff"));
    }

    Update(e: MouseEvent){
        if(!this.penDown)
            return;

        //Fixxa sto obrobrio :(((
        //let x = e.offsetX - this.canvas.canvas.width/2;
        //let y = -e.offsetY + this.canvas.canvas.height/2;
        
        this.aliveShape.position = {x: e.offsetX, y: e.offsetY};

        this.RemovePathInsideCircle(this.canvas.shapes[this.canvas.shapes.length-1] as Path)

        this.canvas.Refresh();
        
        //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
    }

    Click(e: MouseEvent){
        this.penDown = !this.penDown;

        this.aliveShape.position = {x: e.offsetX, y: e.offsetY};
        this.canvas.DrawShape(this.aliveShape);
    }

    UpdateTouch(e: TouchEvent){
        if(!this.penDown)
            return;

        let touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            let touch = touches[i];

            let touchX = touch.pageX - this.canvas.bcr.left;
            let touchY = touch.pageY - this.canvas.bcr.top;
            
            let pressure = touch.force;

            this.aliveShape.position = {x: touchX, y: touchY};
            this.canvas.Refresh();
            
            //this.canvas.DrawCircle(x, y, 2, new Color("#222021"));
                
        }

    }

    ClickTouch(e: TouchEvent){
        e.preventDefault();
        this.penDown = !this.penDown;

        if(this.penDown){
            let touches = e.changedTouches;

            for (var i = 0; i < touches.length; i++) {
                let touch = touches[i];

                let touchX = touch.pageX - this.canvas.bcr.left;
                let touchY = touch.pageY - this.canvas.bcr.top;

                let pressure = touch.force;
                this.aliveShape.position = {x: touchX, y: touchY};
                this.canvas.DrawShape(this.aliveShape);
            }
        }
    }

    RemovePathInsideCircle(path: Path){
        let radius = 20;
        let origin: vec2 = { x: this.aliveShape.position.x, y: this.aliveShape.position.y };
        let points: vec2[] = path.stroke;

        //Flatten on X axis
        points.filter((point)=>( ((origin.x + radius) >= point.x && (origin.x - radius) <= point.x ) //Proiezione su X
                                && ((origin.y + radius) >= point.y && (origin.y - radius) <= point.y) )); //Proiezione su Y

        
        for (let i = 0; i < points.length; i++) {
            const pointX = points[i].x;
    
            if((origin.x + radius) >= pointX && (origin.x - radius) <= pointX)
                possiblePoints.push([i, points[i]]);
        }


        //Flatten on Y axis all the possible points
        for (let i = points.length; i >= 0; i--) {
            const pointY = possiblePoints[i][1].y;
    
            if(!((origin.y + radius) >= pointY && (origin.y - radius) <= pointY))
                possiblePoints.splice(i, 1);
        }

        path.stroke = points;
        path.path = new Path2D(this.BuildStroke(points).svg);
    }

    BuildStroke(stroke: Stroke) {
        let smoothStroke = getStroke(stroke, this.strokeSettings);

        return this.GetPathFromStroke(smoothStroke);
    }
    
    GetPathFromStroke(stroke: number[][]) {
        if (!stroke.length) return '';

        //return "M " + ...stroke[0] + "Q";
        const pathData = stroke.reduce(
          (acc, [x0, y0], i, arr) => {
              
            const [x1, y1] = (((i+1) % arr.length) == 0) ? arr[i] : arr[(i + 1)];
            
            acc.push(x0, y0, (x0 + x1)/2, (y0 + y1) / 2);
            return acc;
          },
          ['M', ...stroke[0], 'Q']
        );
      
        return { original: stroke, svg: pathData.join(' ') };
    }
}*/ 
