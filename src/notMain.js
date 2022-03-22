"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeBrush = exports.OnStart = void 0;
const Canvas_1 = require("./Canvas");
const Pen_1 = require("./Pen");
let canvas;
let pen;
let stress;
let ereaser;
//let canvas: HTMLCanvasElement;
//let context : CanvasRenderingContext2D;
let options = {
    penSettings: {
        color: new Canvas_1.Color("#000000")
    },
    strokeSettings: {
        size: 4,
        simulatePressure: false
    }
};
//settingsGUI.add(options.strokeSettings, 'size', false, true); 
//settingsGUI.addColor(options.penSettings, 'color.hex');
let shapeList;
function OnStart() {
    let elem = document.getElementById("canvas");
    canvas = new Canvas_1.DrawingCanvas(elem, 1200, 800, new Canvas_1.Color("#f7f7f7"));
    //Debug.g_shapeList = document.getElementById("shapeList");
    //pen = new NormalPen(canvas, options);
    //stress = new StresTestPen(canvas, options);
    //ereaser = new Eraser(canvas, options);
    //canvas.SetPen(pen);
    canvas.DrawRect(0, 0, 20, 20, new Canvas_1.Color("#4a4e69"));
    canvas.DrawCircle(0, 0, 5, new Canvas_1.Color("#ff0000"));
    /*const inputs = document.getElementsByClassName("inSetts");
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs.item(i);
        input?.addEventListener("change", (e: any)=>{
            console.log(e.target.value);
            if(e.target.getAttribute('name') === "color")
                options.penSettings.color = new Color(e.target.value as string);
            else
                options.strokeSettings[e.target.getAttribute('name')] = e.target.value;
        })
        
    }*/
}
exports.OnStart = OnStart;
function ChangeBrush() {
    if (canvas.currentPen instanceof Pen_1.NormalPen)
        canvas.SetPen(ereaser);
    else
        canvas.SetPen(pen);
}
exports.ChangeBrush = ChangeBrush;
