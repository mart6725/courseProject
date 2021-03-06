import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import{Ingredient} from '../shared/Ingredient.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsChangedSubscription: Subscription;
  

  constructor(private slService: ShoppingListService) { }
  

  ngOnInit(){
    this.ingredients= this.slService.getIngredients();
    this.ingredientsChangedSubscription=this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients= ingredients;
    })
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index); // saame indexi k2tte ja saadame info subjectile shopping list services
  }
ngOnDestroy(){
  this.ingredientsChangedSubscription.unsubscribe();
}
}
