import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Http} from '@angular/http'
import { AssessmenttestsService } from './assessmenttests.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessmenttests',
  templateUrl: './assessmenttests.component.html',
  styleUrls: ['./assessmenttests.component.css']
})
export class AssessmenttestsComponent implements OnInit {
  isShown: boolean = false;
  forms: any[] = [];
  form : any;
  questionsArray: any[] = [];
  formNameArray: any[] = [];
  answer:string[] = [];
  formID:string;
  constructor(private authService:AuthService, private http : Http, private assessmenttestsservice:AssessmenttestsService, private flashmessage:FlashMessagesService, private router:Router ) { }


  ngOnInit() 
  {
     this.authService.getProfile().subscribe(data=>{  
       this.forms = [];
      for(var i = 0; i< data.user.forms.length; i++){
        this.forms.push(data.user.forms[i]);
      }
      this.getForms();
    })
    
  }
  
  getForms()
  {
    this.formNameArray = [];
    for(var i = 0; i< this.forms.length; i++)
    {
        this.assessmenttestsservice.getForms(this.forms[i]).subscribe(data=>
        {
          //Keep this here, it makes it so that null forms arent added
          if (data.manageforms == null)
          {
           
          }
          
          else
          {
            for(var k = 0; k<data.manageforms.questions.length; k++)
            {
              if(data.manageforms.questions[k].answer == null)
              {
                this.formNameArray.push(data.manageforms);
                break;
              }
              else
              {
                //do nothing
              }
            }
          }
      })
    }
  }
  
  getQuestions(id:string)
  {
    this.isShown = true;
    this.formID = id;
  
    for(var i = 0; i< this.forms.length; i++)
    {
      this.assessmenttestsservice.getQuestions(id).subscribe(data=>
      {
        this.questionsArray = [];
        
        for(var j =0; j<data.manageforms.questions.length; j++)
        {
          this.questionsArray.push(data.manageforms.questions[j]);
        }
      })
    }
  }
  
  submitAnswers()
  {
    console.log(this.formID);
    console.log(this.answer);
    for(var i = 0; i< this.answer.length; i++)
    {
      this.assessmenttestsservice.submitAnswers(this.formID, this.questionsArray[i]._id, this.answer[i]).subscribe(data=>
      {
        console.log(data);
        this.flashmessage.show('Response Submitted!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/home']);
      })
    }
  }

}
