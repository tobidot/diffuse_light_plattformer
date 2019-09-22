import Field from "./Field";
import { Key } from "ts-key-enum";
import MapRendererBufferImage from "./RendererBufferImage";


export interface MapRenderer {
    draw: (target: RenderingContext, fields: Array<Field>) => void;
    set_camera: (x: number, y: number, zoom: number) => void;
}

export default class Map {
    private fields: Array<Field>;
    private readonly width: number;
    private readonly height: number;
    private readonly field_height: number;
    private readonly field_width: number;
    private readonly screen_width: number;
    private readonly screen_height: number;
    private renderer: MapRenderer;
    private camera_x = 0;
    private camera_y = 0;
    private camera_zoom = 1;

    public constructor(width: number, height: number, screen_width: number, screen_height: number) {
        this.width = width;
        this.height = height;
        this.screen_height = screen_height;
        this.screen_width = screen_width;
        this.field_width = screen_width / width;
        this.field_height = screen_height / height;
        this.fields = new Array<Field>(width * height);
        this.fields = Array.from(new Array(width * height), () => new Field());
        this.renderer = new MapRendererBufferImage(screen_width, screen_height, width, height);
        this.camera_x = width / 2.0;
        this.camera_y = height / 2.0;
        this.camera_zoom = 1;


        document.onkeydown = (event: KeyboardEvent) => {
            switch (event.code) {
                case Key.ArrowUp: this.camera_y -= 10; break;
                case Key.ArrowDown: this.camera_y += 10; break;
                case Key.ArrowLeft: this.camera_x -= 10; break;
                case Key.ArrowRight: this.camera_x += 10; break;
                case "KeyW": this.camera_zoom *= 2; break;
                case "KeyS": this.camera_zoom /= 2; break;
            }
        };
    }

    drawWebGL(context: WebGL2RenderingContext) {

    }

    draw(target: RenderingContext): void {
        this.renderer.set_camera(this.camera_x, this.camera_y, this.camera_zoom); 
        this.renderer.draw(target, this.fields);
    }

    public get_field_at_position(x: number, y: number): Field | false {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
        return this.fields[x + y * this.width];
    }


}