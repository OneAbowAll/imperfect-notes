import { DrawingCanvas, Color } from "./Canvas";
import { Debug } from "./Debug";
import { Eraser, LivePen, NormalPen, StresTestPen } from "./Pen";
import { Settings } from "./Types";

let canvas : DrawingCanvas;
let pen : NormalPen;
let stress : StresTestPen;
let ereaser: Eraser;
//let canvas: HTMLCanvasElement;
//let context : CanvasRenderingContext2D;

let options: Settings = {
    penSettings:{
        color: new Color("#000000")
    },

    strokeSettings:{
        size: 4,
        simulatePressure: false
    }
};

//settingsGUI.add(options.strokeSettings, 'size', false, true); 
//settingsGUI.addColor(options.penSettings, 'color.hex');
let shapeList;

export function OnStart() {
    let elem = document.getElementById("canvas") as HTMLCanvasElement;
    canvas = new DrawingCanvas(elem, 1200, 800, new Color("#f7f7f7"));

    //Debug.g_shapeList = document.getElementById("shapeList");

    //pen = new NormalPen(canvas, options);
    //stress = new StresTestPen(canvas, options);
    //ereaser = new Eraser(canvas, options);

    //canvas.SetPen(pen);
    
    canvas.DrawRect(0, 0, 20, 20, new Color("#4a4e69"));
    canvas.DrawCircle(0, 0, 5, new Color("#ff0000"));

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

export function ChangeBrush(){
    if(canvas.currentPen instanceof NormalPen)
        canvas.SetPen(ereaser);
    else
        canvas.SetPen(pen)
}