import { Component,OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private slService: ShoppingListService,
              private route:ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(){
    this.route.params
    .subscribe(
    (params: Params) => {
        this.id = +params['id'];
        this.recipe= this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddShoppingList(ingredients: Ingredient[]){
    for(var i=0; i<ingredients.length;i++){
      this.slService.addIngredient(ingredients[i])
    }
  }
onEditRecipe(){
  //this.router.navigate(['edit'],{relativeTo:this.route})
  this.router.navigate(['../', this.id,'edit'],{relativeTo:this.route});  // t88tab sama moodi , alguses one level up ja siis meie path
}
onDelete(){
  this.recipeService.deleteRecipe(this.id)
  this.router.navigate([''],{relativeTo: this.route})
}


}
