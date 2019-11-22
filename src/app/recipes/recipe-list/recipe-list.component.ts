import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe-model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simple test ', 'https://encrypted-tbn0.gstatic.' +
      'com/images?q=tbn%3AANd9GcSBODrznTfETMEKiIGvtZQW2mLjwpLl7K13KtmcbYvRhSCPjcQQ'),
    new Recipe('A recipe test', 'This is simple test ', 'https://encrypted-tbn0.gstatic.' +
      'com/images?q=tbn%3AANd9GcSBODrznTfETMEKiIGvtZQW2mLjwpLl7K13KtmcbYvRhSCPjcQQ')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
