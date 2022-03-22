import { StrokeOptions } from "perfect-freehand";
import { Color } from "./Canvas";
import { Stroke, vec2 } from "./Types";

export interface Shape{
    position: vec2;
    color: Color;

    Draw: (ctx: CanvasRenderingContext2D) => void;
}

export class Rectangle implements Shape{
    position: vec2;
    size: vec2;
    color: Color;

    constructor (x: number, y: number, w: number, h: number, color: Color){
        this.position = {x: x, y: y};
        this.size = {x: w, y: h};
        this.color = color;
    }

    Draw(ctx: CanvasRenderingContext2D){
        let oldColor = ctx.fillStyle;
        
        ctx.fillStyle = this.color.hex;
        let {x, y} = this.position as {x: number, y: number};
        let {x: w, y: h} = this.size as {x: number, y: number};

        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = oldColor;
    }
}

export class Circle implements Shape{
    position: vec2;
    radius: number;
    color: Color;


    constructor (x: number, y: number, radius: number, color: Color){
        this.position = {x: x, y: y};
        this.radius = radius;
        this.color = color;
    }

    Draw(ctx: CanvasRenderingContext2D){
        let oldColor = ctx.strokeStyle;
        
        
        let {x, y} = this.position as {x: number, y: number};
        
        ctx.strokeStyle = this.color.hex;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2*Math.PI);
        ctx.stroke();

        ctx.strokeStyle = oldColor;
    }
}

export class Path implements Shape{
    position: vec2;
    color: Color;

    stroke: Stroke;
    path: Path2D;

    constructor (path: Path2D, stroke: Stroke, color: Color){
        this.position = {x: 0, y: 0};
        this.color = color;
        
        this.stroke = stroke;
        this.path = path;
    }

    Draw(ctx: CanvasRenderingContext2D){
        let oldColor = ctx.fillStyle;
        
        ctx.fillStyle = this.color.hex;
        ctx.fill(this.path);

        ctx.fillStyle = oldColor;
    }
}