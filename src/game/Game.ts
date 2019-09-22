import { compileShader, createProgram } from "../webgl/shader_compiling";
import Map from "./Map";
import FPSDisplay from "../html-elements/FPSDisplay";

type ModeRenderContext = CanvasRenderingContext2D;

export class Game {
    private canvas: HTMLCanvasElement;
    private drawing_context: ModeRenderContext;
    private map: Map;
    private fps_display: FPSDisplay;

    constructor(canvas: HTMLCanvasElement) {
        let width = 400;
        let height = 240;
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.drawing_context = canvas.getContext('2d') as ModeRenderContext;
        
        this.map = new Map(400, 300, width, height);

        let content_element: HTMLElement = document.getElementsByClassName('content').item(0) as HTMLElement;
        this.fps_display = new FPSDisplay(content_element);
    }

    public update(time_elapsed: number): void {
        this.map.draw(this.drawing_context);
        this.fps_display.update();
    }


}



function use_webgl(canvas: HTMLCanvasElement) {
    /*
    this.drawing_context = canvas.getContext('webgl') as WebGLRenderingContext;
    let vertShaderCode = require('../webgl/vertexShader.vert');
    let fragShaderCode = require('../webgl/fragmentShader.frag');
    console.log(vertShaderCode);
    console.log(fragShaderCode);

    let vertShader = compileShader(this.drawing_context, vertShaderCode, this.drawing_context.VERTEX_SHADER);
    let fragShader = compileShader(this.drawing_context, fragShaderCode, this.drawing_context.FRAGMENT_SHADER);
    let program = createProgram(this.drawing_context, vertShader, fragShader);
    */
}