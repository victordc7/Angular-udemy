import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: string;
  recipe: any;
  editMode: boolean;
  recipeForm: FormGroup;
  ingredientsForm: FormGroup;
  selectedIngredient = new Subject<number>();
  subscription1: Subscription;
  value: number;
  recipeIngredients = new FormArray([]);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeS: RecipeService,
    private shoppingS: ShoppingListService) { }

  ngOnInit() {
    this.shoppingS.getIngredientsDB();
    this.editMode = false;
    this.shoppingS.createMode = false;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id) {
          this.editMode = true;
          this.recipe = this.recipeS.recipes.find(( recipe ) =>  recipe._id === this.id );
          this.recipe.procedure = this.recipe.procedure.replace(/<br>/g, '\n');
        }
        this.initForm();
      }
    );
    this.subscription1 = this.selectedIngredient.subscribe(
      (index) => {
        const name1 = this.recipeForm.value.ingredients[index].name;
        this.recipeIngredients.at(index).patchValue({
          medida: this.shoppingS.ingredientsDB.find(function(ingredient) {
            return ingredient.name === name1 ;
          }).medida
        });
      }
    );
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
      this.recipeForm.value['procedure']
    );
    newRecipe.procedure = newRecipe.procedure.replace(/\n/g, '<br>');
    if (this.editMode) {
      this.recipeS.updateRecipe(this.recipe._id, newRecipe);
    } else {
      this.recipeS.addRecipe(newRecipe);
    }
    this.router.navigate(['/recetas']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/)
        ]),
        medida: new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(i) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }


  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeProcedure = '';
    if (this.editMode) {
      const recipe = this.recipeS.recipes.find(( recipe2 ) =>  recipe2._id === this.id );
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      recipeProcedure = recipe.procedure;
      if (recipe['ingredients']) {
        for (let index = 0; index < recipe.ingredients.length; index++) {
          const ingredient = recipe.ingredients[index];
          this.recipeIngredients.push(
            this.ingredientsForm = new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/)
              ]),
              medida: new FormControl(ingredient.medida, Validators.required)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: this.recipeIngredients,
      procedure: new FormControl(recipeProcedure, Validators.required),
    });
  }

  OnBlur(i) {
    this.selectedIngredient.next( i );
  }
}
