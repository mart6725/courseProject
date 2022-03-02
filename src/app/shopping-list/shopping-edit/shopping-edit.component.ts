import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm: NgForm;       // saame ligi html formile 


  subscription: Subscription;
  editMode=false; 
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(){
    this.subscription=this.slService.startedEditing.subscribe( // kuulame servicet et saada indexi v22rtus
        (index: number) => {
            this.editedItemIndex= index;
            this.editMode=true;
            this.editedItem= this.slService.getIngredient(index); // servicest saame indexi abil k2tte vastava komponendi
            this.slForm.setValue({                                // s88dame html vormile saadud v22rtused
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
        }
    );        
  }
  ngOnDestroy(){
    this.subscription.unsubscribe(); // kui componendilt lahkume siis paneme kuulamise kinni et m2lu leket ei oleks 
      
  }
  onSubmit(form:NgForm){
    const value= form.value;
    const newIngredient=new Ingredient(value.name,value.amount)

    if(this.editMode){
      this.slService.updateIngredient(newIngredient,this.editedItemIndex);
      
    }else{
      this.slService.addIngredient(newIngredient);
      
    }
    this.slForm.reset();
    this.editMode=false;
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }
}
