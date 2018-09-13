import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public procedure: string;

    constructor(name: string, desc: string, img: string, ingredients: Ingredient[], procedure: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = img;
        this.ingredients = ingredients;
        this.procedure = procedure;
    }
}
