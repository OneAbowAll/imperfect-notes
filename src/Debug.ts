import { Shape } from "./Shapes";

const D_InputPoints = false;

export class Debug{
    static g_shapeList: HTMLElement | null;

    static AddToShapeList(obj: Shape[]){
        if(this.g_shapeList == null)
            return;

        let list = "";

        for (let i = 0; i < obj.length; i++) {
            const element = obj[i];
            list += JSON.stringify(element.constructor.name) + "\n";
        }

        this.g_shapeList.innerText = list;
    }
}