import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppingListRecipe: ShoppingListService) {
  }

  onEditItem(index: number) {
    this.shoppingListRecipe.startedEditing.next(index);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListRecipe.getIngredients();
    this.igChangeSub = this.shoppingListRecipe.ingredientsChanged
      .subscribe((ingredient: Ingredient[]) => this.ingredients = ingredient);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
