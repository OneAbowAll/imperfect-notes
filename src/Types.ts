import { StrokeOptions } from "perfect-freehand";
import { Color } from "./Canvas";

export type vec2 = { x: number, y: number, pressure?: number };
export type Stroke = number[][];

export type PenSettings = {
    color: Color
};

export type Settings = { penSettings: PenSettings, strokeSettings: StrokeOptions}