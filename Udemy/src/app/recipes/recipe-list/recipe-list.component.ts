import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Titulo de la receta', 'Descripcion de la receta', 'http://www.upsocl.com/wp-content/uploads/2015/04/comida-mexicana.jpg'),
    new Recipe('Otra receta', 'Otra descripcion de receta',
    'https://www.euroresidentes.com/alimentacion/comida/wp-content/uploads/sites/3/2017/02/comidas-tipicas-argentina-milanesa.jpg')
  ];
  @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected( recipe: Recipe ) {
    this.recipeWasSelected.emit(recipe);
  }
}
