import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShopingEditComponent } from './shopping-list/shoping-edit/shoping-edit.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'recetas', component: RecipesComponent, children: [
    { path: '', component: RecipesHomeComponent, pathMatch: 'full' },
    { path: 'nueva-receta', component: RecipeEditComponent},
    { path: ':id', component: RecipeDetailComponent},
    { path: ':id/editar', component: RecipeEditComponent}
  ]},
  { path: 'carro-de-compras', component: ShoppingListComponent },
  { path: '**' , redirectTo: '/' , pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShopingEditComponent,
    HeaderComponent,
    HomeComponent,
    RecipesHomeComponent,
    RecipeEditComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
