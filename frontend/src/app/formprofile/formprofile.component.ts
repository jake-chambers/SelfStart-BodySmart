import { Component, OnInit } from '@angular/core';
import {QuestionformService} from '../questionform/questionform.service';
import {FormprofileService} from '../formprofile/formprofile.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formprofile',
  templateUrl: './formprofile.component.html',
  styleUrls: ['./formprofile.component.css']
})
export class FormprofileComponent implements OnInit {
  message3: any;
    showEdit: boolean = true;
  constructor(public questionformservice: QuestionformService, public formprofileservice: FormprofileService, private flashmessage:FlashMessagesService, private router:Router) { }

  ngOnInit() {
    this.questionformservice.currentMessage3.subscribe(message3 => this.message3 = message3);
  }
  deleteQuestion(id:string, qid:string)
  {
    if (confirm("Do you wish to delete this question")) 
    {
      
    
    this.formprofileservice.deleteQuestion(id, qid).subscribe(data=>{
      this.flashmessage.show('Question Deleted!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/questions']);

    })
    }
  }
  newMessage(message: any){
    this.formprofileservice.changeMessage(message);
  }
  showEditFunction()
  {
    this.showEdit = !this.showEdit;
  }
  editForm(id: string, name: string, description: string){
    this.formprofileservice.editForm(id, name, description).subscribe(data=>{
      this.flashmessage.show('From Edited!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/questions']);
    })
  }

}
