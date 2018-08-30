export class Recipe {
    public name: String;
    public description: String;
    public imagePath: String;

    constructor(name: string, desc: string, img: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = img;
    }
}
