import { Component, OnInit } from '@angular/core';
import { AddquestionService } from './addquestion.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {FormprofileService} from '../formprofile/formprofile.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  message: any;
  constructor(public addquestion:AddquestionService, 
              private flashmessage:FlashMessagesService,
              private router:Router,
              public formprofileservice:FormprofileService) { }

  ngOnInit() {
    this.formprofileservice.currentMessage.subscribe(message => this.message = message);
  }
  
  addQuestion(id:string, questiontext:string){
    if(questiontext == null || questiontext == ''){
      this.flashmessage.show('Question must be filled out!', {cssClass: 'alert-danger', timeout: 3000});
    }
    else{
      this.addquestion.addQuestion(id, questiontext).subscribe(data=>{
      this.flashmessage.show('Question added to Question Library!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/questions']);
    })
    }
    
  }
}
