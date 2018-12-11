import { Component, OnInit } from '@angular/core';
import {QuestionformService} from './questionform.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.css']
})
export class QuestionformComponent implements OnInit {
  questionArray: any [] = [];

  constructor(public questionformservice: QuestionformService, private flashmessage:FlashMessagesService) { }
  
  newMessage3(message: any)
  {
    this.questionformservice.changeMessage3(message);
  }
  
  deleteQuestion(questionId: string)
  {
    this.questionformservice.deleteQuestion(questionId).subscribe(data=> {
      console.log("Deleting question:" + questionId);
      console.log("The deleted question: ")
      console.log(data);
    })
    
    this.ngOnInit();
  }
  
  editQuestion(questionId: string, edited: string)
  {
   this.questionformservice.editQuestion(questionId, edited).subscribe(data=>{
     console.log ("The edited question: " + questionId + " changed to " + edited);
     console.log(data);
   })
   
   this.ngOnInit();
  }
  deleteForm(id:string)
  {
    if (confirm("Do you wish to delete this form?")) 
    {
       this.questionformservice.deleteForm(id).subscribe(data=>{
       location.reload();
       this.flashmessage.show('Form deleted!', {cssClass: 'alert-success', timeout: 3000});

   })
    }
   
   
  }
  
  //This function is called upon page load, we are getting and displaying the questions when the page loads
  ngOnInit() 
  {
    this.questionformservice.getQuestions().subscribe(data=>{
      this.questionArray = [];
      
      for (var i = 0; i < data.manageforms.length; i++)
      {
        this.questionArray.push(data.manageforms[i]);
        console.log(data.manageforms[i].name);
      }
      
      console.log("These are the forms");
      console.log(data);
      
    })
  }
}

