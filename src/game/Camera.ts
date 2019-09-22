import Point from "./Point";

export default class Camera {
    public position: Point;
    public viewport_width: number;
    public viewport_height: number;
    public zoom: number;

    constructor(width: number, height:number) {
        this.position = new Point();
        this.zoom = 1;
        this.viewport_width = width;
        this.viewport_height = height;
    }

    set_position(position: Point) {
        this.position = position;
    }

    get_position(): Point{
        return this.position ;
    }

    world_to_camera_coordinates(world_point: Point): Point {
        let result = new Point();
        result.x = (world_point.x - this.position.x) * this.zoom / this.viewport_width;
        result.y = (world_point.y - this.position.y) * this.zoom / this.viewport_height;
        result.z = world_point.z;
        return result;
    }

    camera_to_world_coordinates(local_point: Point): Point {
        let result = new Point();
        result.x = (local_point.x ) * this.viewport_width / this.zoom + this.position.x;
        result.y = (local_point.y ) * this.viewport_height / this.zoom + this.position.y;
        result.z = local_point.z;
        return result;
    }
}