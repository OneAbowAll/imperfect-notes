import { Debug } from "./Debug";
import { Pen } from "./Pen";
import { Shape, Circle, Path, Rectangle } from "./Shapes";
import { Stroke } from "./Types";

export class DrawingCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    width: number;
    height: number;

    shapes: Shape[];
    currentPen: Pen | null;
    
    //bounding client rect
    bcr;
    
    constructor(canvas: HTMLCanvasElement, width: number, height: number, color:Color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        
        this.currentPen = null;
        this.bcr = canvas.getBoundingClientRect();

        //Setta canvas
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;

        this.canvas.style.setProperty("margin-left", -this.canvas.width/2+"px");
        this.canvas.style.setProperty("margin-top", -this.canvas.height/2+"px");

        //Init gli elementi
        this.shapes = [new Rectangle(0, 0, this.canvas.width, this.canvas.height, color)];
        
        //Set up event listeners
        this.canvas.addEventListener("mousemove", (e)=>this.WritingHandler(e));
        this.canvas.addEventListener("mousedown", (e)=>this.PenHandler(e));
        //this.canvas.addEventListener("mouseup", (e)=>this.PenHandler(e));

        this.Refresh();
    }

    Refresh(updatedShape?: Shape){
        if(this.ctx == null)
            return;
        
        if(updatedShape)
            this.shapes[this.shapes.length-1] = updatedShape;
        
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const len = this.shapes.length;
        for (let i = 0; i < len; i++)
            this.shapes[i].Draw(this.ctx);

        Debug.AddToShapeList(this.shapes);
    }

    DrawBackground(color: Color){
        let bg: Shape = this.shapes[0];
        bg.color = color;

        this.Refresh();
    }

    DrawRect(x: number = 0, y: number = 0, width: number = 0, height: number = 0, color: Color){
        //Recenter Coords
        x += this.canvas.width/2;
        y = this.canvas.height/2 - y;

        width *= 2;
        height *= 2;

        this.DrawShape(new Rectangle(x, y, width, height, color));
    }
    
    DrawCircle(x: number = 0, y: number = 0, radius: number = 0, color: Color){
        //Recenter Coords
        x += this.canvas.width/2;
        y = this.canvas.height/2 + y;
        
        this.DrawShape(new Circle(x, y, radius, color));
    }

    DrawPath(path: Path2D, stroke: Stroke, color: Color){
        this.DrawShape(new Path(path, stroke, color));
    }

    //Ricorda che teoricamente DrawShape dovrebbe essere la base per tutti gli altri Draw... ora come ora va bene quindi :)
    DrawShape(shape: Shape){
        if(this.ctx == null)
            return;
            
        this.shapes.push(shape);
        this.Refresh();
    }

    DestroyShape(index?: number){
        if(!index) index = this.shapes.length-1

        this.shapes.slice(index, 1);
    }
    
    PenHandler(e:MouseEvent | TouchEvent){
        e.preventDefault();
        e.stopImmediatePropagation();

        if(e instanceof MouseEvent)
            this.currentPen?.Click(e);
        else
            this.currentPen?.ClickTouch(e);
    }

    WritingHandler(e:MouseEvent | TouchEvent){
        e.preventDefault();
        e.stopImmediatePropagation();
        
        if(e instanceof MouseEvent)
            this.currentPen?.Update(e);
        else
            this.currentPen?.UpdateTouch(e);
    }

    SetPen(pen: Pen){ //Ben lontano dall'essere una cosa inteligggente ma per ora funziona :)

        this.currentPen = pen;
    }
}

export class Color {
    hex: string;
    
    constructor(hex: string, r: number = 0, g: number = 0, b: number = 0) {
        if(hex)
            this.hex = hex;
        else
            this.hex = this.ToHex(r, g, b);
    }

    static FromHex(hex: string): Color{
        let color = new Color(hex);
        return color;
    }

    ToHex(r: number, g: number, b: number): string{
        let hR  = r.toString(16);
        let hG = g.toString(16);
        let hB = b.toString(16);
        return "#" + (hR.length == 1 ? "0" + hR : hR) + (hG.length == 1 ? "0" + hG : hG) + (hB.length == 1 ? "0" + hB : hB);
    }

    ToRGB(): string{

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex);
        
        if(result === null)
            return 'rgb(0, 0, 0)';

        let r = parseInt(result[1], 16);
        let g =  parseInt(result[2], 16);
        let b =  parseInt(result[3], 16);

        return 'rgb(' + r +','+ g +','+ b + ')';
    }
}