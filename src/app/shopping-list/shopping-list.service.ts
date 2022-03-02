import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

export class ShoppingListService{
    ingredientsChanged= new Subject<Ingredient[]>();
    startedEditing= new Subject<number>();
    private ingredients: Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
    ];
    getIngredients(){
        return this.ingredients.slice();

    }
    getIngredient(index:number){
        return this.ingredients[index];

    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(ingredient: Ingredient,index: number){
        this.ingredients[index]= ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice()); // slice abil saadame array koopia 
    }
}