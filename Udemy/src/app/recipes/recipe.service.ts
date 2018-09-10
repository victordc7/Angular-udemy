import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Plato Mexicano',
      'Variados platos mexicanos con una interesante combinacion de sabores',
      'http://www.upsocl.com/wp-content/uploads/2015/04/comida-mexicana.jpg',
      [ new Ingredient('Caraotas', 1, 'Kg'),
        new Ingredient('Pollo', 0.2, 'Kg')
      ]
    ),
    new Recipe(
      'Milanesa de Pollo',
      'Milanesa de pollo empanisada acompañada de papas fritas',
      'https://www.euroresidentes.com/alimentacion/comida/wp-content/uploads/sites/3/2017/02/comidas-tipicas-argentina-milanesa.jpg',
      [ new Ingredient('Pollo', 1, 'Kg'),
        new Ingredient('Papas', 1, 'Kg')
      ]
    ),
    new Recipe(
      'Pizza de Peperoni',
      'Rica pizza de peperoni al tradicional estilo newyorkino',
      'https://d25rq8gxcq0p71.cloudfront.net/language-guide/758/pepperoni%20pizza.jpg',
      [ new Ingredient('Harina', 1, 'Kg'),
        new Ingredient('Peperoni', 0.3, 'Kg')
      ]
    )
  ];
  recipeSelected: Recipe;
  constructor() { }

  onSelect() {

  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

}
