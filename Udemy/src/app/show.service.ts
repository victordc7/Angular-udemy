import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  public sRecipes = false;
  public sShoppingList = false;
  constructor() { }

  showRecipes() {
    this.sRecipes = true;
    this.sShoppingList = false;
  }
  showShoppingList() {
    this.sRecipes = false;
    this.sShoppingList = true;
  }
  home() {
    this.sRecipes = false;
    this.sShoppingList = false;
  }
}
