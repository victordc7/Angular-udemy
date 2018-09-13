import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor( private recipeS: RecipeService) { }

  ngOnInit() {
    this.recipeS.getRecipes();
  }

  scroll(target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
