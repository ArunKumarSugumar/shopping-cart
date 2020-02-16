import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe-model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(fetchAction => {
      return this.http.get<Recipe[]>('https://ng-course-recipe-book-e3e71.firebaseio.com/recipes.json');
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []};
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipe = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionDate, recipesState]) => {
      return this.http.put('https://ng-course-recipe-book-e3e71.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }
}
