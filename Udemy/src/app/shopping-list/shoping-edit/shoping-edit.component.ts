import { Component, OnInit, ViewChild, DoCheck, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('f') signupForm: NgForm;
  selectedIngredientChange = new Subject<string>();
  subscription1: Subscription;
  subscription2: Subscription;
  ingredients: Ingredient[];
  selectedIngredientDB = { name: '' , medida: ''};
  selectedIngredient = { name: '', medida: ''};
  constructor(private shoppingS: ShoppingListService) { }

  ngDoCheck() {
    this.selectedIngredientChange.next(this.signupForm.value.name);
  }

  ngOnInit() {
    this.ingredients = this.shoppingS.ingredients;

    this.shoppingS.getIngredientsDB();

    this.subscription1 = this.selectedIngredientChange.subscribe(
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


}
