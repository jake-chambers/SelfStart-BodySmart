import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ManageusersService } from '../manageusers/manageusers.service';
import { QuestionformService } from '../questionform/questionform.service';
import { SummaryReportService } from './summary-report.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css'],
  providers: [SummaryReportService],
})
export class SummaryReportComponent implements OnInit {

  ID: any;
  patient: any[] = [];
  forms: any[] = [];
  rehabPlans: any[] = [];
  dataArray: any[] = [];
  formsPatient: any[] = [];
  exercisePatient: any[] = [];
  ratingArray: any[] = [];
  rating: any[] = [4,2,3,4,5];
  exerciseArray: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private manageusers: ManageusersService, private form: QuestionformService, private summary: SummaryReportService) {
  }

  ngOnInit() 
  {
    this.getRating();
    let id = this.route.snapshot.paramMap.get('_id');
    this.ID = id;
    console.log(this.ID);
    this.patient = [];
    this.manageusers.getProfile(id).subscribe(data=>{
      this.patient = data.manageUsers;
      this.forms = data.manageUsers.forms;
      this.exercisePatient = data.manageUsers.rehabPlan;
      console.log(this.exercisePatient);
      console.log(this.patient);
      this.getForms(id);
      this.getExercises(id);

    });
  }
  
  getForms(id: string)
  {
    console.log("Forms are right here");
    console.log(this.forms);
    for(var i = 0; i < this.forms.length; i ++){
      this.form.getQuestion(this.forms[i]).subscribe(data=>{
        if (data.manageforms == null)
        {
          
        }
        
        else
        {
          this.formsPatient.push(data.manageforms);
        }
      });
    }
    console.log("this is the form data");
    console.log(this.formsPatient);
  }
  
  getExercises(id: string){
    console.log(this.exercisePatient);
    for(var i = 0; i < this.exercisePatient.length; i++){
      this.manageusers.getRehabPlan(this.exercisePatient[i]).subscribe(data=>{
        console.log(data.rehabPlan);
        console.log("this is the rehabPlan data");
        this.rehabPlans.push(data.rehabPlan);
      });
    }
    console.log(this.rehabPlans);
  }
  
  //the chart works but we need to put a delay on when the chart fires as the data is still being calculated and is undefined when the chart loads...
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels:string[] = ["Exercise 1", "Exercise 2", "Exercise 3","Exercise 4", "Exercise 5"];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: this.rating, label: 'Rating'},
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  


  getRating(){
    this.summary.getRating().subscribe(data => {
      var arr = [];
      for(var i = 0; i < data.manageexercises.length; i++){
        console.log(data.manageexercises[i].rating);
        arr.push(data.manageexercises[i].rating);
      }
      console.log(arr);
      console.log(data);
      
      for(var i = 0; i < arr.length; i++){
        var avg = this.average(arr[i]);
        console.log(avg);
        this.ratingArray.push(avg);
      }
      console.log(this.ratingArray);
    });
  }
  
  average(array: any[]){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
      sum = sum + array[i];
    }
    sum = sum / array.length;
    console.log(sum);
    return sum;
  }
  
  getExercisesForPlan(id: string) {
    this.summary.getExercisesForPlan(id).subscribe(data => {
      for(var i =0; i < data.rehabPlan.exercises.length; i++){
        this.exerciseArray = data.rehabPlan.exercises;
      }
      console.log(data.rehabPlan.exercises);
    });
    console.log(this.exerciseArray);
  }
    
}
