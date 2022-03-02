
import { Ingredient } from '../shared/Ingredient.model';
import{ Recipe} from './recipe.model';


export class RecipeService{
    private recipes: Recipe[] =[new Recipe(
        'Pannkoogid mootori6liga',
        'meeliülendav kogemus!',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        [
        new Ingredient('Flour',10),
        new Ingredient('Eggs',5),
        new Ingredient('MotorOil',1)
    ]),

        new Recipe('Oa pasta pada',
        'Lecker!',
        'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
        [
        new Ingredient('pasta',1),
        new Ingredient('beans',1),
        new Ingredient('frozen vegetables',1)
        ])];
    

getRecipes(){
    return this.recipes.slice();            //slice teeb koopia arrayst
}
getRecipe(id:number){
    return this.recipes[id];
}


}