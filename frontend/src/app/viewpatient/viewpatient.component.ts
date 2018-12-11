import { Component, OnInit } from '@angular/core';
import { ManageusersService} from '../manageusers/manageusers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {QuestionformService} from '../questionform/questionform.service';
import {ViewpatientService} from './viewpatient.service'
import { AssessmenttestsService } from '../assessmenttests/assessmenttests.service';
import { CreateplanService } from '../createplan/createplan.service'
import 'rxjs/add/operator/switchMap';
import { MakepaymentService } from '../makepayment/makepayment.service';


@Component({
  selector: 'app-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.css']
})
export class ViewpatientComponent implements OnInit {
  
  ID: any;
  patientID: any[] = [];
  pat: any = [];
  exerciseArrays: any[] = [];
  formsArray: any[] = [];
  thePatientID: string = '';
  assessmentsArray: any[] = [];
  questionsArray:any[] = [];
  patforms:any[] = [];
  rehabPlans: string[] = [];
  rehabs:any[] = [];
  isCollapsed1: boolean = false;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  paymentsArray: any[] = [];
  
  constructor(private createplanservice: CreateplanService, private manageusers: ManageusersService,private questionformservice: QuestionformService, private flashmessage :FlashMessagesService, private router: Router, private route: ActivatedRoute, private assessmenttestsservice:AssessmenttestsService, private payments: MakepaymentService) { }

  ngOnInit() 
  {
    let id = this.route.snapshot.paramMap.get('_id');
    console.log("THIS IS THE ID I WANNA USE" + id);
    this.thePatientID = id;
    this.getPatient(id);
    this.getQuestions();
    this.getPayments();
  }
  
  getQuestions() 
  {
    this.formsArray = [];
    return this.questionformservice.getQuestions().subscribe(data=>{
      console.log(data);
      
      for(var i = 0; i < data.manageforms.length; i++) {
        this.formsArray.push(data.manageforms[i]);
      }
    });
  }
  
  
  getPayments()
  {
      this.paymentsArray = [];
      return this.payments.getPayments().subscribe(data => {
        console.log('THESE ARE THE PAYMENTS')
        console.log(data.payments);
        
        var parsed = JSON.parse(data.payments);
        console.log("PARSED:")
        console.log(parsed.payments[0].transactions);
        
        console.log (parsed.payments[0].transactions.length);
        for (var i = 0; i < parsed.payments[0].transactions.length; i++)
        {
          this.paymentsArray.push(parsed.payments[0].transactions[i].amount.total);
          console.log('THIS ONE');
          console.log(this.paymentsArray[i]);
        }
      });
  }
  
  getPatient(id: string)
  {
      return this.manageusers.getProfile(id).subscribe(data=>{
        console.log(data);
        
      this.pat = data.manageUsers;
        console.log("pat ");
        console.log(this.pat);
        
        
      this.patforms = data.manageUsers.forms;
        console.log("patforms");
        console.log(this.patforms);
        
      this.rehabPlans = data.manageUsers.rehabPlan;
      console.log(this.rehabPlans);
    
      
      for(var i = 0; i < this.rehabPlans.length; i++){
        console.log(this.rehabPlans[i]);
        this.getRehabPlan(this.rehabPlans[i]);
      }
      
      
      
      //this works to display forms in assessment tab
      for(var i = 0; i< this.patforms.length; i++)
      {
        this.assessmenttestsservice.getForms(this.patforms[i]).subscribe(data=>{
          console.log('HEYMANNNN');
          console.log(data);
          
          
          //Keep this here, it makes it so that null forms arent added
          if(data.manageforms == null)
          {
            
          }
          
          else
          {
            this.assessmentsArray.push(data.manageforms);
          }
      })
    }
    })
  }
  
  getRehabPlan(id:string){
    this.createplanservice.getRehabPlanByID(this.rehabPlans).subscribe(data => {
      console.log(data);
      
      for(var i = 0; i < data.rehabPlan.exercises.length; i++){
        this.exerciseArrays.push(data.rehabPlan.exercises[i]);
      }
      console.log(this.exerciseArrays);

    });
  }
  
 
  collapsed(event: any): void {

  }
 
  expanded(event: any): void {
  }



  sendForm(formID:string){
    console.log(this.thePatientID);
    this.questionformservice.sendForm(formID, this.thePatientID).subscribe(data=>{
      this.flashmessage.show('Form Sent!', {cssClass: 'alert-success', timeout: 3000});
      console.log(data);
    })
  }
  
  getFormQuestions(id:string)
  {
    for(var i = 0; i< this.patforms.length; i++)
    {
      this.assessmenttestsservice.getQuestions(id).subscribe(data=>
      {
        this.questionsArray = [];
        console.log("QUESTIONS: ");
        console.log(data);
        for(var j =0; j<data.manageforms.questions.length; j++)
        {
          this.questionsArray.push(data.manageforms.questions[j]);
        }
      })
    }
  }
}
