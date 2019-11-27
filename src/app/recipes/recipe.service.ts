import {Recipe} from './recipe-model';
import {EventEmitter} from '@angular/core';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simple test ', 'https://encrypted-tbn0.gstatic.' +
      'com/images?q=tbn%3AANd9GcSBODrznTfETMEKiIGvtZQW2mLjwpLl7K13KtmcbYvRhSCPjcQQ'),
    new Recipe('A recipe test', 'This is simple test ', 'https://encrypted-tbn0.gstatic.' +
      'com/images?q=tbn%3AANd9GcSBODrznTfETMEKiIGvtZQW2mLjwpLl7K13KtmcbYvRhSCPjcQQ')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

}
