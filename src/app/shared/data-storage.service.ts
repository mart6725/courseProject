import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({
    providedIn: 'root'                      // siis ei pea app.module providerisse lisama eraldi
})
export class DataStorageService{


    constructor(private http: HttpClient,private recipeService: RecipeService){     // recipeservicega saame lihtsalt ligi

    }

storeRecipes(){
    const recipes = this.recipeService.getRecipes();        //put on firebase eriline v6imalus, kirjutab yle k6ik vana 


    this.http.put('https://recipe-book-5e048-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    recipes)
    .subscribe(response=>{
        console.log(response);
    })                       

    }
fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipe-book-5e048-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(map(recipes=>{
        return recipes.map(recipe=>{ // see on javascripti array meetod
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} //vajadusel lisame tyhja ingredients array
        });                                                                                 // ... on koopia
    }),
    tap(recipes=>{
        this.recipeService.setRecipes(recipes);
    })
    )
   

}
}