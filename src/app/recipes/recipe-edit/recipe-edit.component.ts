import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, recipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      ).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImage = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredient) {
          for (const ingredientVal of recipe.ingredient) {
            console.log(ingredientVal.name);
            console.log(ingredientVal.amount);
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredientVal.name, Validators.required),
              amount: new FormControl(ingredientVal.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            }));
          }
        }
      });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredient: recipeIngredients
    });
  }

  getControls() {
    console.log(this.recipeForm.get('ingredient'));
    return (this.recipeForm.get('ingredient') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredient') as FormArray).push(new FormGroup({
      name: new FormControl(Validators.required),
      amount: new FormControl(null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }));
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredient') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
