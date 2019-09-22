export default class Field {
    public type: string;

    constructor() {
        this.type = Math.random() > 0.5 ? "Rock" : "Solid";
    }
}