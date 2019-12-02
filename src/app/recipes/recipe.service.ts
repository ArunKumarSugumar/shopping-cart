import {Recipe} from './recipe-model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

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

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }


  constructor(private shoppingListService: ShoppingListService) {
  }
}
