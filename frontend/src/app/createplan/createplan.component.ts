import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ManageexercisesService } from '../manageexercises/manageexercises.service'
import { CreateplanService } from '../createplan/createplan.service'
import { ManageusersService } from '../manageusers/manageusers.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-createplan',
  templateUrl: './createplan.component.html',
  styleUrls: ['./createplan.component.css'],
  providers: [ManageexercisesService, ManageusersService]
})
export class CreateplanComponent implements OnInit {

  private url = "https://selfstartbodysmart-jakechambers12.c9users.io/api";
  
  addStatus: boolean = true;
  removeStatus: boolean = true;
  
  buttonStatus: any = 'disabled';

  exerciseArray: any [] = [];
  
  selectExerciseArray: any[] = [];
  
  exerciseID: string;
  
  exercisePlanArray: any[] = []; //important
  exercisePlanArray2: any[] = [];
  
  selectedExercise: any;
  
  patientid:any;
  
  select: any;
  
  getRehabPlanArray: any[] = []; //values from getRehabPlan go into here
  
  rehabPlanArray: any[] = []; //holds the value of single rehab plan when selectRehabPlan is called
  
  rehabPlanIDArray: any[] = [];
  
  rehabPlanName: string;
  rehabPlanID: string;
  showTable: boolean= false;
  
  buttonColor: string = '80b0bf';
  buttonColor2: string = 'dd9694';
  showSelectedPlan: boolean = true;


  constructor (private http:Http, public manageexercisesservice: ManageexercisesService, public createplanService: CreateplanService, private manageusers: ManageusersService, private router: Router, private route: ActivatedRoute, private flashmessage:FlashMessagesService) {}
  
  ngOnInit() {
    this.getExercises();
    //gets patient id from route
    let id = this.route.snapshot.paramMap.get('_id');
    this.patientid = id;
    console.log("patient id:" + this.patientid);
    //this.getPatientExercises(this.patientid);
    this.getRehabPlans();
  }
  
  getExercises(){
    this.manageexercisesservice.getExercises().subscribe(data=>{
      this.exerciseArray = [];
      for (var i = 0; i < data.manageexercises.length; i++){
        this.exerciseArray.push(data.manageexercises[i]);
      }
      console.log(data.manageexercises);
      console.log(this.exerciseArray);
    })
  }
  
  //gets single exercise by id
  getExerciseByID(p: string){
    this.createplanService.getExerciseByID(p).subscribe(data=>{
      this.selectedExercise = data.manageexercises;
      console.log("This is the exercise information");
      console.log(data.manageexercises);
      console.log("this is the exercise array")
      console.log(this.selectedExercise);
    });
  }
  
  onSelectExercise(p:string){
    this.getExerciseByID(p);
    this.buttonColor = '#5bc0de';
    this.addStatus = false;
    this.removeStatus = true;
    this.exerciseID = p;
    console.log(this.exerciseID);
  }
  
  onSelectInPlan(p:string)
  {
    this.getExerciseByID(p);
    this.buttonColor2 = '#d9534f';
    this.removeStatus = false;
    this.addStatus = true;
    this.exerciseID = p;
    console.log(this.exerciseID);
  }
  
  addToPlan(){
    console.log(this.selectedExercise._id);
    this.exercisePlanArray.push(this.selectedExercise);
    this.addStatus = true;
    this.buttonColor = '80b0bf';
    console.log(this.exercisePlanArray);
    this.showTable = true;
  }
  
  getPatientExercises(p: string){
    this.createplanService.getPlan(p).subscribe(data=>{
      console.log(data);
      console.log(data.manageUsers.rehabPlan);
      this.exercisePlanArray = [];
      for (var i = 0; i < data.manageUsers.rehabPlan.length; i++){
        this.exercisePlanArray.push(data.manageUsers.rehabPlan[i]);
      }
      console.log("this is the exercise plan for the patient")
      console.log(this.exercisePlanArray);
    });
  }
  
  removeExerciseFromPlan() {
    this.buttonColor2 = 'dd9694';
    this.removeStatus = true;
    var index = this.exercisePlanArray.findIndex(x => x._id == this.exerciseID);
    console.log(index);
    this.exercisePlanArray.splice(index, 1);
    console.log(this.exercisePlanArray);
  }

  
  //This one is the rehabplans one
  addRehabPlan(name : string)
  {
    var check = true;
    var message = "";
    console.log(this.rehabPlanArray);
    if (name.length == 0)
    {
      check = false;
      message = message.concat("The plan needs a name. ");
    }
    if(this.exercisePlanArray.length == 0)
    {
      check = false;
      message = message.concat("No exercises added ");
    }
    if (check)
    {
        this.createplanService.createRehabPlan(this.exercisePlanArray, this.rehabPlanName).subscribe(data => {
          console.log(data);
          this.flashmessage.show("Plan Created", {cssClass: 'alert-success', timeout: 5000});
        });
        this.getRehabPlans();
    }
    else
    {
        this.flashmessage.show(message, {cssClass: 'alert-danger', timeout: 5000});
    }
  }
  
  getRehabPlans() {
    this.createplanService.getRehabPlans().subscribe(data=> {
      console.log('HERE IS THE REHAB PLANS')
      console.log(data.rehabPlan);
      this.getRehabPlanArray = data.rehabPlan;
    });
  }
  
  selectRehabPlan(id: string) 
  {
    this.showSelectedPlan = false;
    var index = this.getRehabPlanArray.findIndex(x => x._id == id);
    this.rehabPlanID = this.getRehabPlanArray[index]._id
    
    this.createplanService.getRehabPlanByID(id).subscribe(data => 
    {
      console.log('HERE')
      console.log(data.rehabPlan.exercises);
      this.exercisePlanArray2 = data.rehabPlan.exercises;
      console.log("IT WORKS RIGHT HERE, YOU SELECTED THIS ONE")
      console.log(this.exercisePlanArray2);
    });
  }
  
  addRehabPlanPatient(){
    console.log('YOU ARE TRYING TO ADD ')
    this.rehabPlanIDArray.push(this.rehabPlanID);
    console.log(this.rehabPlanIDArray);
    this.createplanService.addRehabPlanPatient(this.patientid, this.rehabPlanIDArray).subscribe(data => {
      console.log(data);
              this.flashmessage.show("Plan successfully added", {cssClass: 'alert-success', timeout: 5000});
               window.scrollTo(0, 0)

    });
  }
  
  deleteRehabPlan(id: string){
    this.createplanService.deleteRehabPlan(id).subscribe(data=>{
      
    });
    this.getRehabPlans();
  }
  
}
