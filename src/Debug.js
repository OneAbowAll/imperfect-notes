"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
const D_InputPoints = false;
class Debug {
    static AddToShapeList(obj) {
        if (this.g_shapeList == null)
            return;
        let list = "";
        for (let i = 0; i < obj.length; i++) {
            const element = obj[i];
            list += JSON.stringify(element.constructor.name) + "\n";
        }
        this.g_shapeList.innerText = list;
    }
}
exports.Debug = Debug;
