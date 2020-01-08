import {Recipe} from './recipe-model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tandoori',
      'Pepper tandoori chicken ',
      'https://encrypted-tbn0.gstatic.' +
      'com/images?q=tbn%3AANd9GcSBODrznTfETMEKiIGvtZQW2mLjwpLl7K13KtmcbYvRhSCPjcQQ',
      [new Ingredient('Meat', 1),
        new Ingredient('Pepper', 10)]),
    new Recipe('Pizza',
      'Pepperoni pizza with sauce',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/' +
      'WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg',
      [new Ingredient('Meat', 1),
        new Ingredient('Cheese', 1)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


  constructor(private shoppingListService: ShoppingListService) {
  }
}
