export default class FPSDisplay {
    private display: HTMLElement;
    private last_update: number;

    constructor(parent: HTMLElement) {
        this.display = document.createElement('div');
        this.display.className = 'fps-display';
        parent.append(this.display);
        this.last_update = performance.now();
    }

    update(fps?:number) {
        if (fps) {
            this.display.innerText = fps.toPrecision(5);
        } else {
            let now = performance.now();
            let seconds_needed_last_frame = ((now - this.last_update) / 1000.0);
            let fps = 1.0 / seconds_needed_last_frame;
            this.display.innerText = fps.toPrecision(5);
            this.last_update = now;
        }
    }
}