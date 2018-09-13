import { Component, OnInit, ViewChild, OnDestroy, Output } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') signupForm: NgForm;
  subscription1: Subscription;
  subscription2: Subscription;
  ingredients: Ingredient[];
  selectedIngredientDB: string;
  selectedIngredient = { name: '', medida: ''};
  constructor(private shoppingS: ShoppingListService) { }


  ngOnInit() {
    this.ingredients = this.shoppingS.ingredients;
    this.shoppingS.getIngredientsDB();
    this.shoppingS.createMode = false;

    this.subscription1 = this.shoppingS.selectedIngredientChange.subscribe(
      ( name ) => {
        if ( name !== undefined && name !== '') {
          this.selectedIngredient = this.shoppingS.ingredientsDB.find(function(ingredient) {
            return ingredient.name === name;
          });
        } else {
          this.selectedIngredient = { name: '', medida: ''};
        }
      }
    );

    this.subscription2 = this.shoppingS.editItem.subscribe(
      ( ingredient ) => {
        this.signupForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
          medida: ingredient.medida
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
  onChange() {
    this.shoppingS.changeSelectedIngredient(this.selectedIngredientDB);
  }
}
