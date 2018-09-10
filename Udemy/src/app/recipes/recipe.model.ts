import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: String;
    public description: String;
    public imagePath: String;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, img: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = img;
        this.ingredients = ingredients;
    }
}
