import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [];
  selectedIngredientChange = new Subject<string>();
  editItem = new Subject<Ingredient>();
  editItemIndex: number;
  editMode = false;
  createMode = false;
  ingredientsDB: any = [];
  existe;
  Iexiste;
  total;

  constructor(private http: HttpClient) { }

  getIngredientsDB() {
    this.http.get('http://localhost:8080/api/ingredients')
    .subscribe( (data: HttpHeaders) => {
      this.ingredientsDB = data;
      this.ingredientsDB = this.ingredientsDB.sort(function compare(a, b) {
      if ( a.name < b.name ) {
        return -1;
      }
      if ( a.name > b.name ) {
        return 1;
      }
      return 0;
      });
    }) ;
  }

  createIngredientDB( newIngredient ) {
    this.http.post('http://localhost:8080/api/ingredients', newIngredient )
    .subscribe( ( data: HttpHeaders) => {
      this.ingredientsDB = data;
      this.ingredientsDB = this.ingredientsDB.sort(function compare(a, b) {
      if ( a.name < b.name ) {
        return -1;
      }
      if ( a.name > b.name ) {
        return 1;
      }
      return 0;
      });
    }) ;
  }


  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
  }

  onAddItem(form: NgForm) {
    if (this.editMode) {
      this.ingredients[this.editItemIndex].name = form.value.name;
      this.ingredients[this.editItemIndex].amount = (Number(form.value.amount));
      this.ingredients[this.editItemIndex].medida = form.value.medida;
      this.editMode = false;
    } else {
      this.Iexiste = this.ingredients.findIndex( function(ingrediente) {
        return ingrediente.name ===  form.value.name;
      });
      this.existe = this.ingredients.find( function(ingrediente) {
        return ingrediente.name ===  form.value.name;
      });
      if ( this.Iexiste >= 0 ) {
        this.total = (Number(form.value.amount)) + (Number(this.existe.amount));
        this.ingredients[this.Iexiste].amount = this.total;
      } else {
        this.ingredients.push(new Ingredient(form.value.name, form.value.amount, form.value.medida));
      }
    }
    this.resetForm(form);
  }

  onCreateIngredient( form: NgForm ) {
     const newIngredient = form.value;
     this.createIngredientDB(newIngredient);
     this.createMode = false;
  }

  createIngredient() {
    this.createMode = true;
  }

  cancelCreate() {
    this.createMode = false;
  }

  onEditIngredient( i: number) {
    this.editMode = true;
    this.editItemIndex = i;
    this.editItem.next(this.ingredients[i]);
  }

  onDeleteIngredient( i: number ) {
    this.ingredients.splice(i, 1);
  }

  cancelEdit(form: NgForm) {
    this.resetForm(form);
    this.editMode = false;
  }

  resetForm(form: NgForm) {
    form.setValue({name: '', amount: '', medida: form.value.medida });
  }

  changeSelectedIngredient(data) {
    this.selectedIngredientChange.next( data );
  }
}
