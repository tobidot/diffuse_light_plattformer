import { MapRenderer } from "./Map";
import Field from "./Field";

class RayResult {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public distance: number = 0;
}


export default class MapRendererBufferImage implements MapRenderer {

    private resolution_width: number;
    private resolution_height: number;
    private map_width: number;
    private map_height: number;
    private image_data: ImageData;
    private current_fields_array: Array<Field>;
    private camera_x: number;
    private camera_y: number;
    private camera_zoom: number;


    constructor(resolution_width: number, resolution_height: number, map_width: number, map_height:number) {
        this.resolution_width = resolution_width;
        this.resolution_height = resolution_height;
        this.map_width = map_width;
        this.map_height = map_height;
        this.image_data = new ImageData(resolution_width, resolution_height);
        this.current_fields_array = new Array<Field>();
        this.camera_x = 0;
        this.camera_y = 0;
        this.camera_zoom = 1;
    }

    public draw(target: RenderingContext, fields: Array<Field>): void {
        if (target instanceof CanvasRenderingContext2D == false) {
            throw "Invalid renderer for this render target";
        }
        const max_ray_distance = 100;
        this.current_fields_array = fields;
        for (let x = 0; x < this.resolution_width; ++x) {
            for (let y = 0; y < this.resolution_height; ++y) {
                let ray_position_x = (x - this.resolution_width / 2) / this.camera_zoom + this.camera_x;
                let ray_position_y = (y - this.resolution_height / 2) / this.camera_zoom + this.camera_y;
                let ray_position_z = 50;
                let ray_result = this.trace_ray([ray_position_x, ray_position_y, ray_position_z], max_ray_distance);
                let color = [127, 127, 127, 255];
                if (ray_result !== false) {
                    color = this.get_color_at_position(Math.trunc(ray_result.x), Math.trunc(ray_result.y));
                    let ray_distance_percent = ray_result.distance / max_ray_distance
                    let gray_factor = ray_distance_percent * ray_distance_percent;
                    color[0] = color[0] * (1 - gray_factor) + 127 * gray_factor;
                    color[1] = color[1] * (1 - gray_factor) + 127 * gray_factor;
                    color[2] = color[2] * (1 - gray_factor) + 127 * gray_factor;
                }

                let target_base = (x + y * this.resolution_width) * 4;
                this.image_data.data[target_base + 0] = color[0];
                this.image_data.data[target_base + 1] = color[1];
                this.image_data.data[target_base + 2] = color[2];
                this.image_data.data[target_base + 3] = color[3];
            }
        }
        (target as CanvasRenderingContext2D).putImageData(this.image_data,0,0);
    }

    public set_camera(x: number, y: number, zoom: number) {
        this.camera_x = x;
        this.camera_y = y;
        this.camera_zoom = zoom;
    }


    private trace_ray(ray: [number, number, number], max_iterations:number): RayResult | false {
        let iterations = 0;
        let [x, y, z] = ray;
        let vx = 0, vy = 0, vz = -1;

        // START --- define demo diffusing object
        let t = performance.now() / 1000;
        let sphereX = Math.sin(t) * this.map_width / 4 + this.map_width / 2;
        let sphereY = Math.cos(t) * this.map_height / 4 + this.map_height / 2;
        let sphereZ = 25;
        let size = 50;
        let strength = 0.005;
        // END --- define demo diffusing object
        while (z > 0 && iterations < max_iterations) {
            let dx = sphereX - x;
            let dy = sphereY - y;
            let dz = sphereZ - z;
            let d2 = dx * dx + dy * dy + dz * dz;
            if (d2 < size * size) {
                let d = Math.sqrt(d2);
                let close_factor = 1 - d / size;
                vx += (dx * close_factor) * strength;
                vy += (dy * close_factor) * strength;
                vz += (dz * close_factor) * strength;
            }
            x += vx;
            y += vy;
            z += vz;
            iterations++;
        }
        if (iterations >= max_iterations) return false;
        return { x, y, z, distance: iterations };
    }

    private get_color_at_position(x: number, y: number): number[] {
        let field = this.get_field_at_position(x, y);
        if (field === false) return [0, 0, 0, 255];
        if (field.type === "Rock") {
            return [0, 255, 0, 255];
        } else if ("Solid") {
            return [255, 0, 0, 255];
        }
        return [0, 0, 0, 255];
    }

    private get_field_at_position(x: number, y: number): Field | false {
        if (x < 0 || x >= this.map_width || y < 0 || y >= this.map_height) return false;
        return this.current_fields_array[x + y * this.map_width];
    }
}