import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddShoppingList(ingredients: Ingredient[]){
    for(var i=0; i<ingredients.length;i++){
      this.slService.addIngredient(ingredients[i])
    }
      
  }
}
