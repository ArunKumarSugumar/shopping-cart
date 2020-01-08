import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
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
    /* const newRecipe = new Recipe(
       this.recipeForm.value.name,
       this.recipeForm.value.description,
       this.recipeForm.value.imagepath,
       this.recipeForm.value.ingredient);*/
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
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

}
