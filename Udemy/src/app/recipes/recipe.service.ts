import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: any = [];
  recipes2 = new Subject<any>();
  filteredName = '';


  constructor(private http: HttpClient, private router: Router) { }


  getRecipes() {
    this.http.get('http://localhost:8080/api/recipes')
    .subscribe( (data: HttpHeaders) => {
      this.recipes = data;
      this.recipes2.next(data);
    }) ;
  }

  addRecipe( newRecipe ) {
    this.http.post('http://localhost:8080/api/recipes', newRecipe )
    .subscribe( (data: HttpHeaders) => {
      this.recipes = data;
    }) ;
  }

  updateRecipe(id, item) {
    this.http.put('http://localhost:8080/api/recipes/' + id, item )
    .subscribe( (data: HttpHeaders) => {
      this.recipes = data;
    }) ;
  }

  deleteRecipe(item) {
    this.http.delete('http://localhost:8080/api/recipes/' + item._id )
    .subscribe( (data: HttpHeaders) => {
      this.recipes = data;
      this.router.navigate(['/recetas']);
    }) ;
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

}
