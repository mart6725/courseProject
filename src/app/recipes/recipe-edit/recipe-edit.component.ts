import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,private recipeService:RecipeService, private router:Router) { }

  ngOnInit(){
    this.route.params
    .subscribe((params: Params) => {
        this.id= +params['id'];
        this.editMode= params['id'] != null;    // kui id olemas siis edit mode , kui ei siis new recipe mode
        this.initForm()
    });
    

  }
  private initForm(){
    
    let recipeName='';
    let imagePath='';
    let description='';
    let recipeIngredients= new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      imagePath=recipe.imagePath;
      description=recipe.description;
      if(recipe['ingredients']){    // kas retseptil on olemas ingredients
          for( let ingredient of recipe.ingredients){     // loopime yle k2esoleva retsepti komponentide ja lykkame arraysse
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
            }))
          }
      }   
    }

    this.recipeForm=new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': recipeIngredients,             // array mille yleval t2itsime 
    })
  }
  onSave(){
    // const recipe= new Recipe(this.recipeForm.value['name'],            // kuna meil recipeform kattub yksyhele recipe modeliga
    //                         this.recipeForm.value['imagePath'],        
    //                         this.recipeForm.value['description'],
    //                         this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.recipeForm.value,this.id);     // siis saame siin kasutada otse recipeform valuet
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate([''],{relativeTo: this.route})
    
  };

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  };

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(           // castime ingredients form arrayks kuna ts ei saa aru muidu
      new FormGroup({                                               // ja lykkame uue grupi arraysse
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  };
  
  onCancel(){
    
    this.router.navigate(['../'],{relativeTo: this.route})
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
