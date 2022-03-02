import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params
    .subscribe((params: Params) => {
        this.id= +params['id'];
        this.editMode= params['id'] != null;    // kui id olemas siis edit mode , kui ei siis new recipe mode
        
    });
    this.initForm()

  }
  private initForm(){
    this.recipeForm=new FormGroup({
      'name': new FormControl(null),
      'imagePath': new FormControl(null),
      'description': new FormControl(null)
    })
  }

}
