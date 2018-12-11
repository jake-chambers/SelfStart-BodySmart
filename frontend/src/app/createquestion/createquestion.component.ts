import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CreatequestionService} from './createquestion.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createquestion',
  templateUrl: './createquestion.component.html',
  styleUrls: ['./createquestion.component.css']
})
export class CreatequestionComponent implements OnInit {

  constructor(public questionService: CreatequestionService,private flashmessage:FlashMessagesService, private router:Router) 
  {

  }
  
  
  ngOnInit() {
  }
  
  
  createForm (name: string, description: string)
  {
    var name = name.trim();
    var description = description.trim();
    if (name == null || description == null || name == '' || description == '')
    {
      this.flashmessage.show('Do not leave fields blank', {cssClass: 'alert-danger', timeout: 3000});
    }
    
    else
    {
      this.questionService.createForm(name, description).subscribe(data=>{
        console.log(data);
        this.flashmessage.show('New form created!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/questions']);
      })
    }
  }

}
