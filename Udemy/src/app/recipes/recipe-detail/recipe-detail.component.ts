import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  Iexiste;
  existe;
  total;

  constructor( private recipeS: RecipeService,
               private route: ActivatedRoute,
               private router: Router,
               private shoppingS: ShoppingListService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeS.getRecipe(this.id);
    } );
  }

  addToCar() {
    this.recipe.ingredients.forEach(element => {
      this.Iexiste = this.shoppingS.ingredients.findIndex( function(ingrediente) {
        return ingrediente.name ===  element.name;
      });
      this.existe = this.shoppingS.ingredients.find( function(ingrediente) {
        return ingrediente.name ===  element.name;
      });
      if ( this.Iexiste >= 0 ) {
        this.total = (Number(element.amount)) + (Number(this.existe.amount));
        this.shoppingS.ingredients[this.Iexiste].amount = this.total;
      } else {
        this.shoppingS.ingredients.push(element);
      }
    });
    this.router.navigate(['/carro-de-compras']);
  }

}
