import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe;
  editMode = false;
  name: string;

  constructor(private router: ActivatedRoute, private recipeS: RecipeService) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (this.id >= 0) {
          this.editMode = true;
        }
        this.recipe = this.recipeS.getRecipe(this.id);
      });
  }
  onSubmit( form: NgForm ) {
    this.name = form.value.name1;
    console.log(this.name);
    form.reset();
}
}
